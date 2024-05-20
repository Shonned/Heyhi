import pandas as pd
import joblib
import os
from preprocess import preprocess_data, load_data, feature_engineering


def predict_new_loan(new_demand, model, label_encoders, columns):
    new_demand_df = pd.DataFrame([new_demand])
    new_demand_df = feature_engineering(new_demand_df)
    new_demand_df = new_demand_df[columns]

    for column, le in label_encoders.items():
        if column in new_demand_df.columns:
            new_demand_df[column] = le.transform(new_demand_df[column])

    prediction = model.predict(new_demand_df)
    return 'Accepted' if prediction[0] == 1 else 'Refused'


if __name__ == "__main__":
    new_demand = {
        'income': 71000,
        'credits_history': 11,
        'age': 20,
    }
    model_path = os.path.join(os.path.dirname(__file__), '../model/loan_approval_model_optimized.pkl')
    model = joblib.load(model_path)

    current_dir = os.path.dirname(__file__)
    filepath = os.path.join(current_dir, '../data/loan_data_large.json')

    df = load_data(filepath)
    df, label_encoders = preprocess_data(df)
    columns = df.drop('loan_approval', axis=1).columns
    result = predict_new_loan(new_demand, model, label_encoders, columns)
    print(f'The loan request is : {result}')
