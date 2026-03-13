import pandas as pd
import re

class SchemaDetector:
    """
    Intelligent Schema Detection Engine.
    Uses a hybrid approach of keyword weights and data pattern analysis 
    to identify (Payer, Receiver, Amount) columns in arbitrary CSVs.
    """

    def __init__(self):
        self.PAYER_KEYWORDS = ["payer", "from", "debtor", "who_paid", "paid_by", "nameorig", "user_id", "sender", "origin", "customer"]
        self.RECEIVER_KEYWORDS = ["receiver", "to", "creditor", "owed_to", "payee", "namedest", "merchant", "destination", "category", "description", "item", "product"]
        self.AMOUNT_KEYWORDS = ["amount", "amt", "sum", "total", "value", "cost", "spent", "price"]

    def infer_schema(self, df: pd.DataFrame):
        column_scores = {col: {"payer": 0, "receiver": 0, "amount": 0} for col in df.columns}
        
        for col in df.columns:
            col_lower = str(col).lower().strip()
            series = df[col]
            scores = column_scores[col]
            
            # --- 1. Keyword Scoring ---
            for k in self.PAYER_KEYWORDS:
                if k in col_lower: scores["payer"] += 45
            for k in self.RECEIVER_KEYWORDS:
                if k in col_lower: scores["receiver"] += 45
            for k in self.AMOUNT_KEYWORDS:
                if k in col_lower: scores["amount"] += 45

            # --- 2. Data Pattern Scoring ---
            if pd.api.types.is_numeric_dtype(series):
                scores["amount"] += 35
                if not series.empty and series.min() >= 0:
                    scores["amount"] += 15
            
            elif pd.api.types.is_object_dtype(series):
                sample = series.dropna().astype(str)
                if not sample.empty:
                    val_len = sample.str.len().mean()
                    if val_len < 35: 
                        scores["payer"] += 20
                        scores["receiver"] += 20
                    
                    uniques = series.nunique()
                    if uniques > 1:
                        scores["payer"] += 10
                        scores["receiver"] += 10

        # --- 3. Best Column Selection (with collision avoidance) ---
        amount_col = self._pick_best(column_scores, "amount")
        
        # Don't let payer/receiver take the amount column
        for col in column_scores:
            if col == amount_col:
                column_scores[col]["payer"] = -100
                column_scores[col]["receiver"] = -100

        payer_col = self._pick_best(column_scores, "payer")
        if payer_col:
             for col in column_scores:
                 if col == payer_col:
                     column_scores[col]["receiver"] = -100

        receiver_col = self._pick_best(column_scores, "receiver")

        detected = {
            "payer": payer_col,
            "receiver": receiver_col,
            "amount": amount_col
        }

        # --- 4. Special Case: Single User Expenses ---
        if not detected["payer"] and detected["receiver"] and detected["amount"]:
            detected["payer"] = "__SYNTHETIC_USER__"
        
        # --- 5. Fallback for mixed retail datasets ---
        if not detected["receiver"] and detected["amount"]:
             # Drop threshold to find any description/category column
             fallback = self._pick_best(column_scores, "receiver", threshold=0)
             if fallback:
                 detected["receiver"] = fallback

        return detected

    def _pick_best(self, scores_map, key, threshold=25):
        best_col = None
        max_score = threshold
        for col, scores in scores_map.items():
            if scores[key] > max_score:
                max_score = scores[key]
                best_col = col
        return best_col
