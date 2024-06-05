import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from dice_ml import Data, Model
import dice_ml
from explaination import generate_explanations

pd.set_option('display.max_columns', None)
pd.set_option('display.expand_frame_repr', False)

file_path = 'data/credit_risk_dataset.csv'
data = pd.read_csv(file_path)

categorical_features = ['person_home_ownership', 'loan_intent', 'loan_grade', 'cb_person_default_on_file']
data[categorical_features] = data[categorical_features].apply(LabelEncoder().fit_transform)

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

sample_query = {
    "person_age": 35,
    "person_income": 50000,
    "person_home_ownership": 1,
    "person_emp_length": 5,
    "loan_intent": 2,
    "loan_grade": 3,
    "loan_amnt": 15000,
    "loan_int_rate": 12.5,
    "loan_percent_income": 0.3,
    "cb_person_cred_hist_length": 7,
    "cb_person_default_on_file": 0
}

accepted_query = {
    "person_age": 35,
    "person_income": 193502,
    "person_home_ownership": 1,
    "person_emp_length": 5,
    "loan_intent": 2,
    "loan_grade": 5,
    "loan_amnt": 15000,
    "loan_int_rate": 12.5,
    "loan_percent_income": 0.5,
    "cb_person_cred_hist_length": 7,
    "cb_person_default_on_file": 0
}

sample_df = pd.DataFrame([accepted_query])[X.columns]
prediction = model.predict(sample_df)[0]

if prediction == 0:
    print("\nRejected:")
    print(sample_df)

    explanation = exp.generate_counterfactuals(sample_df, total_CFs=5, desired_class="opposite")
    counterfactuals_df = explanation.cf_examples_list[0].final_cfs_df

    print("\nModifications for being accepted (loan_status = 1):")
    print(counterfactuals_df)

    # Generate and print explanations
    for _, cf in counterfactuals_df.iterrows():
        explanations = generate_explanations(sample_df.iloc[0], cf)
        print("\nExplanations:")
        print(explanations)

    print("\n" + "=" * 80 + "\n")
else:
    print("\nAccepted:")
    print(sample_df)
    print("\nThe query was accepted by the model. No counterfactual explanations are needed.\n")
