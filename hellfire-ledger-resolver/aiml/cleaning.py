import pandas as pd
from difflib import SequenceMatcher

try:
    from rapidfuzz import fuzz, process
    RAPIDFUZZ_AVAILABLE = True
except ImportError:
    RAPIDFUZZ_AVAILABLE = False

SIMILARITY_THRESHOLD = 85

PAYER_ALIASES    = ["payer", "from", "debtor", "who_paid", "paid_by"]
RECEIVER_ALIASES = ["receiver", "to", "creditor", "owed_to", "payee"]
AMOUNT_ALIASES   = ["amount", "amt", "sum", "total", "value", "cost"]


def _find_column(df_columns, aliases):
    lower_cols = {c.strip().lower(): c for c in df_columns}
    for alias in aliases:
        if alias in lower_cols:
            return lower_cols[alias]
    return None


def _safe_str(val):
    """Convert any value to string safely; return None for NaN/null."""
    if val is None:
        return None
    if isinstance(val, float) and pd.isna(val):
        return None
    s = str(val).strip()
    return None if s.lower() in ("nan", "none", "n/a", "") else s


def _build_canonical_names(names):
    """Cluster similar names and map each variant to a canonical form."""
    clean_names = [n.title() for n in names if n]
    unique = list(dict.fromkeys(clean_names))

    canonical_map = {}
    assigned = {}

    for name in unique:
        if name in assigned:
            canonical_map[name] = assigned[name]
            continue

        if assigned:
            candidates = list(assigned.values())
            if RAPIDFUZZ_AVAILABLE:
                best_match, score, _ = process.extractOne(
                    name, candidates, scorer=fuzz.ratio
                )
            else:
                best_match = max(
                    candidates,
                    key=lambda c: SequenceMatcher(None, name.lower(), c.lower()).ratio()
                )
                score = SequenceMatcher(None, name.lower(), best_match.lower()).ratio() * 100

            if score >= SIMILARITY_THRESHOLD:
                canonical_map[name] = best_match
                assigned[name] = best_match
                continue

        canonical_map[name] = name
        assigned[name] = name

    return canonical_map


def load_and_clean_data(file_path):
    """
    Load any compatible CSV and clean it. Handles:
      - Column name variants (from/to, payer/receiver, debtor/creditor)
      - Dollar signs and commas in amounts ($20, $11.50, 1,000)
      - Missing/NaN payer or receiver names
      - Duplicate transactions
      - Fuzzy name normalization (MIKE = mike = mik)
      - Self-payments

    Returns: (cleaned DataFrame, "amount")
    """
    try:
        df = pd.read_csv(file_path)
    except FileNotFoundError:
        raise FileNotFoundError(
            f"CSV file not found: '{file_path}'\n"
            f"Make sure the file exists in the correct folder."
        )

    # --- Auto-detect columns ---
    payer_col    = _find_column(df.columns, PAYER_ALIASES)
    receiver_col = _find_column(df.columns, RECEIVER_ALIASES)
    amount_col   = _find_column(df.columns, AMOUNT_ALIASES)

    missing = []
    if not payer_col:
        missing.append(f"payer column (tried: {PAYER_ALIASES})")
    if not receiver_col:
        missing.append(f"receiver column (tried: {RECEIVER_ALIASES})")
    if not amount_col:
        missing.append(f"amount column (tried: {AMOUNT_ALIASES})")

    if missing:
        raise ValueError(
            "CSV is missing required columns:\n"
            + "\n".join(f"  - {m}" for m in missing)
            + f"\n\nColumns found: {list(df.columns)}"
        )

    df = df.rename(columns={
        payer_col:    "payer",
        receiver_col: "receiver",
        amount_col:   "amount"
    })

    # --- Drop rows with missing payer or receiver ---
    before = len(df)
    df["payer"]    = df["payer"].apply(_safe_str)
    df["receiver"] = df["receiver"].apply(_safe_str)
    df = df.dropna(subset=["payer", "receiver"])
    dropped_names = before - len(df)
    if dropped_names:
        print(f"[cleaning] Dropped {dropped_names} row(s) with missing payer/receiver.")

    # --- Clean amounts: strip $, commas, spaces ---
    df["amount"] = (
        df["amount"].astype(str)
        .str.replace(r"[\$,\s]", "", regex=True)
        .pipe(pd.to_numeric, errors="coerce")
    )
    before = len(df)
    df = df.dropna(subset=["amount"])
    df = df[df["amount"] > 0]
    dropped_amt = before - len(df)
    if dropped_amt:
        print(f"[cleaning] Dropped {dropped_amt} row(s) with invalid/zero amounts.")

    # --- Remove exact duplicate transactions ---
    before = len(df)
    df = df.drop_duplicates(subset=["payer", "receiver", "amount"])
    dupes = before - len(df)
    if dupes:
        print(f"[cleaning] Removed {dupes} duplicate transaction(s).")

    # --- Fuzzy name normalization ---
    all_names = [_safe_str(n) for n in list(df["payer"]) + list(df["receiver"])]
    all_names = [n for n in all_names if n]
    canonical_map = _build_canonical_names(all_names)

    def normalize(name):
        s = _safe_str(name)
        if not s:
            return "Unknown"
        key = s.title()
        return canonical_map.get(key, key)

    orig_payers    = df["payer"].tolist()
    orig_receivers = df["receiver"].tolist()
    df["payer"]    = df["payer"].apply(normalize)
    df["receiver"] = df["receiver"].apply(normalize)

    for orig, norm in zip(orig_payers, df["payer"].tolist()):
        if str(orig).strip().title() != norm:
            print(f"[cleaning] '{orig}' → '{norm}'")
    for orig, norm in zip(orig_receivers, df["receiver"].tolist()):
        if str(orig).strip().title() != norm:
            print(f"[cleaning] '{orig}' → '{norm}'")

    # --- Drop self-payments ---
    self_pay = len(df[df["payer"] == df["receiver"]])
    if self_pay:
        print(f"[cleaning] Dropped {self_pay} self-payment row(s).")
        df = df[df["payer"] != df["receiver"]]

    df = df.reset_index(drop=True)
    print(f"[cleaning] Ready: {len(df)} valid transactions.")
    return df, "amount"