import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from schema import Settlement
from optimizer import optimize_settlements


def test_basic_settlement():
    """A owes B 10, B owes C 10 — should collapse to A pays C 10."""
    transactions = [("A", "B", 10), ("B", "C", 10)]
    result = optimize_settlements(transactions)
    assert len(result) == 1
    assert result[0].debtor == "A"
    assert result[0].creditor == "C"
    assert result[0].amount == 10.0


def test_no_transactions():
    """Empty input should return empty output."""
    result = optimize_settlements([])
    assert result == []


def test_already_balanced():
    """A pays B 10, B pays A 10 — net zero, no settlements needed."""
    transactions = [("A", "B", 10), ("B", "A", 10)]
    result = optimize_settlements(transactions)
    assert result == []


def test_multiple_debtors():
    """Three people owe one person — should be 3 settlements max."""
    transactions = [
        ("Eddie", "Mike", 30),
        ("Dustin", "Mike", 20),
        ("Lucas", "Mike", 10),
    ]
    result = optimize_settlements(transactions)
    assert len(result) <= 3
    total_paid = sum(s.amount for s in result)
    assert round(total_paid, 2) == 60.0


def test_float_precision():
    """Floating point amounts should not cause rounding errors."""
    transactions = [("A", "B", 0.1), ("A", "B", 0.2)]
    result = optimize_settlements(transactions)
    assert len(result) == 1
    assert result[0].amount == 0.30


def test_settlements_minimize_transactions():
    """5 raw transactions should reduce to fewer settlements."""
    transactions = [
        ("Eddie", "Mike",   15.50),
        ("Mike",  "Dustin",  8.00),
        ("Dustin","Lucas",  22.75),
        ("Lucas", "Eddie",  10.00),
        ("Will",  "Mike",    5.25),
    ]
    result = optimize_settlements(transactions)
    assert len(result) < len(transactions)


def test_to_dict_format():
    """Settlement.to_dict() must return correct keys."""
    s = Settlement("Eddie", "Mike", 15.5)
    d = s.to_dict()
    assert "from"   in d
    assert "to"     in d
    assert "amount" in d
    assert d["from"]   == "Eddie"
    assert d["to"]     == "Mike"
    assert d["amount"] == 15.5


if __name__ == "__main__":
    tests = [
        test_basic_settlement,
        test_no_transactions,
        test_already_balanced,
        test_multiple_debtors,
        test_float_precision,
        test_settlements_minimize_transactions,
        test_to_dict_format,
    ]
    passed = 0
    for t in tests:
        try:
            t()
            print(f"  PASS  {t.__name__}")
            passed += 1
        except AssertionError as e:
            print(f"  FAIL  {t.__name__}: {e}")
        except Exception as e:
            print(f"  ERROR {t.__name__}: {e}")
    print(f"\n{passed}/{len(tests)} tests passed")