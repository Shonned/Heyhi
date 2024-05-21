import pandas as pd
import joblib
import os


def load_data(filepath):
    df = pd.read_csv(filepath)
    return df


def load_label_encoders(columns, model_dir):
    label_encoders = {}
    for column in columns:
        encoder_path = os.path.join(model_dir, f'label_encoder_{column}.pkl')
        if os.path.exists(encoder_path):
            label_encoders[column] = pd.read_pickle(encoder_path)
    return label_encoders


def preprocess_new_demand(new_demand_df, label_encoders):
    for column, le in label_encoders.items():
        if column in new_demand_df.columns:
            new_demand_df[column] = le.transform(new_demand_df[column])
            new_demand_df[column] = new_demand_df[column].astype('category')
    return new_demand_df


def predict_new_loan(new_demand, model, label_encoders, columns):
    new_demand_df = pd.DataFrame([new_demand])
    new_demand_df = preprocess_new_demand(new_demand_df, label_encoders)
    new_demand_df = new_demand_df[columns]

    prediction = model.predict(new_demand_df)
    return 'Accepted' if prediction[0] == 1 else 'Refused'


if __name__ == "__main__":
    new_demand = {
        'person_age': 21,
        'person_income': 11520,
        'person_home_ownership': 'OWN',
        'person_emp_length': 20,
        'loan_intent': 'HOMEIMPROVEMENT',
        'loan_grade': 'C',
        'loan_amnt': 5000,
        'loan_int_rate': 0.05,
        'loan_percent_income': 0.07,
        'cb_person_default_on_file': 'N',
        'cb_person_cred_hist_length': 25
    }

    model_path = os.path.join(os.path.dirname(__file__), '../model/loan_approval_model_optimized.pkl')
    model = joblib.load(model_path)

    current_dir = os.path.dirname(__file__)
    processed_filepath = os.path.join(current_dir, '../data/processed_credit_risk_dataset.csv')

    df = load_data(processed_filepath)
    columns = df.drop('loan_status', axis=1).columns

    label_encoders = load_label_encoders(columns, os.path.dirname(model_path))
    result = predict_new_loan(new_demand, model, label_encoders, columns)
    print(f'The loan request is : {result}')
