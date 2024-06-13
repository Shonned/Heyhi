import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from dice_ml import Data, Model
import dice_ml

# Import the explanation functions
from explanations import generate_explanations

# Adjust display settings
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

rejected_samples = X_test[y_test == 0]

for i in range(min(len(rejected_samples), 1)):
    sample = rejected_samples.iloc[i:i + 1]
    explanation = exp.generate_counterfactuals(sample, total_CFs=5, desired_class="opposite")
    counterfactuals_df = explanation.cf_examples_list[0].final_cfs_df

    print(f"\nRejected {i + 1}:")
    print(sample)
    print("\nModifications for being accepted (loan_status = 1):")
    print(counterfactuals_df)

    for _, cf in counterfactuals_df.iterrows():
        explanations = generate_explanations(sample.iloc[0], cf)
        print("\nExplanations:")
        print(explanations)

    print("\n" + "=" * 80 + "\n")
