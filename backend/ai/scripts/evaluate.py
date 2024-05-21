import joblib
from sklearn.metrics import accuracy_score, classification_report
import os
import pandas as pd

def load_data(filepath):
    df = pd.read_csv(filepath)
    return df

def evaluate_model(model, X_test, y_test):
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    report = classification_report(y_test, y_pred, zero_division=0)
    print(f'Accuracy: {accuracy}')
    print(report)

if __name__ == "__main__":
    model_path = os.path.join(os.path.dirname(__file__), '../model/loan_approval_model_optimized.pkl')
    model = joblib.load(model_path)

    current_dir = os.path.dirname(__file__)
    filepath = os.path.join(current_dir, '../data/processed_credit_risk_dataset.csv')

    df = load_data(filepath)
    X_test = df.drop('loan_status', axis=1)
    y_test = df['loan_status']
    evaluate_model(model, X_test, y_test)
