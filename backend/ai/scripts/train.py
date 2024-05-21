import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
import xgboost as xgb
import joblib
import os
from imblearn.over_sampling import SMOTE

def load_data(filepath):
    df = pd.read_csv(filepath)
    return df

def balance_classes(X_train, y_train):
    smote = SMOTE(random_state=42)
    X_train_balanced, y_train_balanced = smote.fit_resample(X_train, y_train)
    return X_train_balanced, y_train_balanced

def optimize_hyperparameters(X_train, y_train):
    param_grid = {
        'n_estimators': [100, 200, 300],
        'max_depth': [3, 5, 7],
        'learning_rate': [0.01, 0.1, 0.2],
        'subsample': [0.8, 1.0],
        'colsample_bytree': [0.8, 1.0]
    }
    grid_search = GridSearchCV(xgb.XGBClassifier(random_state=42, use_label_encoder=False, eval_metric='logloss'),
                               param_grid, cv=5, n_jobs=-1, verbose=2)
    grid_search.fit(X_train, y_train)
    return grid_search.best_estimator_

def train_model(df):
    X = df.drop('loan_status', axis=1)
    y = df['loan_status']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    X_train_balanced, y_train_balanced = balance_classes(X_train, y_train)
    model = optimize_hyperparameters(X_train_balanced, y_train_balanced)

    model_dir = os.path.join(os.path.dirname(__file__), '../model')
    os.makedirs(model_dir, exist_ok=True)
    model_path = os.path.join(model_dir, 'loan_approval_model_optimized.pkl')
    joblib.dump(model, model_path)

    return model, X_test, y_test

if __name__ == "__main__":
    current_dir = os.path.dirname(__file__)
    filepath = os.path.join(current_dir, '../data/processed_credit_risk_dataset.csv')

    df = load_data(filepath)
    model, X_test, y_test = train_model(df)