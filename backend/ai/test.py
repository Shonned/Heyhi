import pandas as pd
import joblib
import os

from backend.ai.scripts.predict import load_data, preprocess_new_demand

model_path = 'model/loan_approval_model_optimized.pkl'
encoder_paths = {
    'person_home_ownership': 'model/label_encoder_person_home_ownership.pkl',
    'loan_intent': 'model/label_encoder_loan_intent.pkl',
    'loan_grade': 'model/label_encoder_loan_grade.pkl',
    'cb_person_default_on_file': 'model/label_encoder_cb_person_default_on_file.pkl'
}
processed_filepath = 'data/processed_credit_risk_dataset.csv'


def predict_new_loan(new_demand, model, label_encoders, columns):
    new_demand_df = pd.DataFrame([new_demand])
    new_demand_df = preprocess_new_demand(new_demand_df, label_encoders)
    new_demand_df = new_demand_df[columns]
    prediction = model.predict(new_demand_df)
    return 'Accepted' if prediction[0] == 1 else 'Refused'


model = joblib.load(model_path)
label_encoders = {column: joblib.load(path) for column, path in encoder_paths.items()}

df = load_data(processed_filepath)
columns = df.drop('loan_status', axis=1).columns

new_loan_cases = [
    {
        "person_age": 30,
        "person_income": 75000,
        "person_home_ownership": "MORTGAGE",
        "person_emp_length": 10,
        "loan_intent": "HOMEIMPROVEMENT",
        "loan_grade": "A",
        "loan_amnt": 20000,
        "loan_int_rate": 5.5,
        "loan_percent_income": 0.27,
        "cb_person_default_on_file": "N",
        "cb_person_cred_hist_length": 15
    },
    {
        "person_age": 45,
        "person_income": 120000,
        "person_home_ownership": "OWN",
        "person_emp_length": 20,
        "loan_intent": "DEBTCONSOLIDATION",
        "loan_grade": "A",
        "loan_amnt": 15000,
        "loan_int_rate": 5.0,
        "loan_percent_income": 0.125,
        "cb_person_default_on_file": "N",
        "cb_person_cred_hist_length": 25
    },
    {
        "person_age": 22,
        "person_income": 20000,
        "person_home_ownership": "RENT",
        "person_emp_length": 1,
        "loan_intent": "DEBTCONSOLIDATION",
        "loan_grade": "D",
        "loan_amnt": 30000,
        "loan_int_rate": 18.5,
        "loan_percent_income": 1.5,
        "cb_person_default_on_file": "Y",
        "cb_person_cred_hist_length": 2
    }
]

for i, case in enumerate(new_loan_cases):
    result = predict_new_loan(case, model, label_encoders, columns)
    print(f"Case {i + 1}: {result}")
