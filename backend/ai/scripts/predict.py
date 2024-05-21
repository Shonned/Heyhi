import pandas as pd
import joblib
import os


def load_data(filepath):
    df = pd.read_csv(filepath)
    return df


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


model_path = os.path.join(os.path.dirname(__file__), '../model/loan_approval_model_optimized.pkl')
model = joblib.load(model_path)

encoder_paths = {
    'person_home_ownership': os.path.join(os.path.dirname(__file__),
                                          '../model/label_encoder_person_home_ownership.pkl'),
    'loan_intent': os.path.join(os.path.dirname(__file__), '../model/label_encoder_loan_intent.pkl'),
    'loan_grade': os.path.join(os.path.dirname(__file__), '../model/label_encoder_loan_grade.pkl'),
    'cb_person_default_on_file': os.path.join(os.path.dirname(__file__),
                                              '../model/label_encoder_cb_person_default_on_file.pkl')
}

label_encoders = {}
for column, path in encoder_paths.items():
    label_encoders[column] = pd.read_pickle(path)

current_dir = os.path.dirname(__file__)
processed_filepath = os.path.join(current_dir, '../data/processed_credit_risk_dataset.csv')
df = load_data(processed_filepath)
columns = df.drop('loan_status', axis=1).columns
