import pandas as pd
import json
import os
from sklearn.preprocessing import LabelEncoder


def load_data(filepath):
    df = pd.read_json(filepath, orient='records')
    return df


def feature_engineering(df):
    # Exemple de catégorisation des revenus
    df['classified_income'] = pd.cut(df['income'], bins=[0, 30000, 60000, 90000], labels=['low', 'medium', 'high'])
    # Exemple de catégorisation de l'âge
    df['classified_age'] = pd.cut(df['age'], bins=[0, 30, 60, 90], labels=['young', 'adult', 'old'])
    return df


def preprocess_data(df):
    df = feature_engineering(df)

    numeric_columns = df.select_dtypes(include=['number']).columns
    df[numeric_columns] = df[numeric_columns].fillna(df[numeric_columns].mean())

    categorical_columns = df.select_dtypes(include=['object', 'category']).columns
    df[categorical_columns] = df[categorical_columns].fillna(df[categorical_columns].mode().iloc[0])

    label_encoders = {}
    for column in categorical_columns:
        le = LabelEncoder()
        df[column] = le.fit_transform(df[column])
        label_encoders[column] = le

    return df, label_encoders


if __name__ == "__main__":
    current_dir = os.path.dirname(__file__)
    filepath = os.path.join(current_dir, '../data/loan_data_large.json')

    df = load_data(filepath)
    df, label_encoders = preprocess_data(df)
    print(df.head())
