import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from dice_ml import Data, Model
import dice_ml
import os
from backend.v2.explaination import generate_explanations

pd.set_option('display.max_columns', None)
pd.set_option('display.expand_frame_repr', False)

file_path = os.path.join(os.path.dirname(__file__), 'data', 'credit_risk_dataset.csv')
try:
    data = pd.read_csv(file_path)
except FileNotFoundError:
    raise Exception(f"File not found: {file_path}")

categorical_features = ['person_home_ownership', 'loan_intent', 'loan_grade', 'cb_person_default_on_file']

label_encoders = {}
for feature in categorical_features:
    le = LabelEncoder()
    data[feature] = le.fit_transform(data[feature])
    label_encoders[feature] = le

data = data.fillna(data.mean())

X = data.drop('loan_status', axis=1)
y = data['loan_status']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier()
model.fit(X_train, y_train)

data_dice = dice_ml.Data(dataframe=pd.concat([X_train, y_train], axis=1), continuous_features=X.columns.tolist(),
                         outcome_name='loan_status')

backend = 'sklearn'
model_dice = dice_ml.Model(model=model, backend=backend)

exp = dice_ml.Dice(data_dice, model_dice, method='random')


def predict_loan(query_dict):
    for feature in categorical_features:
        if feature in query_dict:
            le = label_encoders.get(feature)
            query_dict[feature] = le.transform([query_dict[feature]])[0]

    sample_df = pd.DataFrame([query_dict])[X.columns]
    prediction = model.predict(sample_df)[0]
    return "Accepted" if prediction == 1 else "Rejected"


def explain_rejection(query_dict):
    for feature in categorical_features:
        if feature in query_dict:
            le = label_encoders.get(feature)
            query_dict[feature] = le.transform([query_dict[feature]])[0]

    sample_df = pd.DataFrame([query_dict])[X.columns]
    explanation = exp.generate_counterfactuals(sample_df, total_CFs=5, desired_class="opposite")
    counterfactuals_df = explanation.cf_examples_list[0].final_cfs_df

    explanations_list = []
    for _, cf in counterfactuals_df.iterrows():
        explanations = generate_explanations(sample_df.iloc[0], cf)
        explanations_list.append(explanations)

    query_dict = {k: (
        int(v) if isinstance(v, (np.integer, np.int64)) else float(v) if isinstance(v, (np.float64, np.float32)) else v)
        for k, v in query_dict.items()}
    counterfactuals_list = counterfactuals_df.applymap(
        lambda x: int(x) if isinstance(x, (np.integer, np.int64)) else float(x) if isinstance(x, (
            np.float64, np.float32)) else x).to_dict(orient="records")

    return {
        "explanations": explanations_list
    }
