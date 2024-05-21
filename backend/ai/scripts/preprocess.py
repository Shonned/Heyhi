import pandas as pd
import os
from sklearn.preprocessing import LabelEncoder


def load_data(filepath):
    df = pd.read_csv(filepath)
    return df


def preprocess_data(df):
    numeric_columns = df.select_dtypes(include=['number']).columns
    df[numeric_columns] = df[numeric_columns].fillna(df[numeric_columns].mean())

    categorical_columns = df.select_dtypes(include=['object']).columns
    if len(categorical_columns) > 0:
        df[categorical_columns] = df[categorical_columns].fillna(df[categorical_columns].mode().iloc[0])

    label_encoders = {}
    for column in categorical_columns:
        le = LabelEncoder()
        df[column] = le.fit_transform(df[column])
        label_encoders[column] = le

    return df, label_encoders


if __name__ == "__main__":
    current_dir = os.path.dirname(__file__)
    filepath = os.path.join(current_dir, '../data/credit_risk_dataset.csv')

    df = load_data(filepath)
    df, label_encoders = preprocess_data(df)
    processed_filepath = os.path.join(current_dir, '../data/processed_credit_risk_dataset.csv')
    df.to_csv(processed_filepath, index=False)

    for col, le in label_encoders.items():
        pd.to_pickle(le, os.path.join(current_dir, f'../model/label_encoder_{col}.pkl'))

    print(df.head())