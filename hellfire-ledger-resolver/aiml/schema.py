class Settlement:

    def __init__(self, debtor: str, creditor: str, amount: float):
        self.debtor = debtor
        self.creditor = creditor
        self.amount = amount

    def to_dict(self) -> dict:
        return {
            "from": self.debtor,
            "to": self.creditor,
            "amount": round(self.amount, 2)
        }

    def __repr__(self):
        return f"{self.debtor} → {self.creditor}: ₹{self.amount:.2f}"