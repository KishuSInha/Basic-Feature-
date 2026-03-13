import json
import sys
import os
from cleaning import load_and_clean_data
from utils import generate_transactions
from optimizer import optimize_settlements


def main():
    # Accept CSV path as argument, or auto-detect any CSV in the folder
    if len(sys.argv) > 1:
        csv_path = sys.argv[1]
    else:
        csv_path = _find_csv_in_cwd()

    if not csv_path:
        print("Usage:   python app.py <your_file.csv>")
        print("Example: python app.py hellfire_debts.csv")
        sys.exit(1)

    print(f"[app] Loading: {csv_path}")

    try:
        df, amount_column = load_and_clean_data(csv_path)
    except (FileNotFoundError, ValueError) as e:
        print(f"\n[ERROR] {e}")
        sys.exit(1)

    transactions = generate_transactions(df, amount_column)

    if not transactions:
        print("[app] No valid transactions found after cleaning.")
        sys.exit(1)

    settlements = optimize_settlements(transactions)

    output = {
        "stats": {
            "raw_transactions":      len(transactions),
            "optimized_settlements": len(settlements),
            "transactions_saved":    len(transactions) - len(settlements)
        },
        "settlements": [s.to_dict() for s in settlements]
    }

    print(json.dumps(output, indent=2))


def _find_csv_in_cwd():
    """Auto-pick the first CSV found in the current folder."""
    for f in os.listdir("."):
        if f.endswith(".csv"):
            print(f"[app] No file specified — auto-detected: {f}")
            return f
    return None


if __name__ == "__main__":
    main()