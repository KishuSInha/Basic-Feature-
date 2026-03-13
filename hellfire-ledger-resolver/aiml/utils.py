import pandas as pd


def generate_transactions(df: pd.DataFrame, amount_column: str = "amount") -> list:
    """
    Convert a cleaned DataFrame into (payer, receiver, amount) tuples.
    """
    transactions = []
    for _, row in df.iterrows():
        payer    = row["payer"]
        receiver = row["receiver"]
        amount   = float(row[amount_column])
        if payer != receiver and amount > 0:
            transactions.append((payer, receiver, amount))
    return transactions