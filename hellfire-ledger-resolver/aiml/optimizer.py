from decimal import Decimal, ROUND_HALF_UP
from schema import Settlement


def _to_decimal(value: float) -> Decimal:
    return Decimal(str(value)).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)


def optimize_settlements(transactions: list) -> list:
    """
    Greedy min-transactions debt settlement algorithm.

    1. Build net balance per person
    2. Match largest debtor with largest creditor repeatedly
    3. Settle as much as possible each step

    Reduces N transactions down to at most N-1 settlements.
    """
    balances = {}

    for payer, receiver, amount in transactions:
        amt = _to_decimal(amount)
        balances[payer]    = balances.get(payer,    Decimal("0")) - amt
        balances[receiver] = balances.get(receiver, Decimal("0")) + amt

    debtors = sorted(
        [[p, -b] for p, b in balances.items() if b < 0],
        key=lambda x: x[1], reverse=True
    )
    creditors = sorted(
        [[p, b] for p, b in balances.items() if b > 0],
        key=lambda x: x[1], reverse=True
    )

    settlements = []
    i, j = 0, 0

    while i < len(debtors) and j < len(creditors):
        debtor,   debt   = debtors[i]
        creditor, credit = creditors[j]

        payment = min(debt, credit)
        settlements.append(Settlement(debtor, creditor, float(payment)))

        debtors[i][1]   -= payment
        creditors[j][1] -= payment

        if debtors[i][1]   <= Decimal("0.01"):
            i += 1
        if creditors[j][1] <= Decimal("0.01"):
            j += 1

    return settlements