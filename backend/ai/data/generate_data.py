import pandas as pd
import numpy as np

np.random.seed(42)


def generate_credit_history(age):
    if age < 30:
        return np.random.randint(0, 5)
    elif age < 50:
        return np.random.randint(5, 20)
    else:
        return np.random.randint(20, 40)


def approve_loan(income, age, credit_history):
    if income > 50000 and credit_history > 10 and age < 60:
        return 1
    elif income > 70000 and credit_history > 5 and age < 70:
        return 1
    elif credit_history > 20 and age < 70:
        return 1
    else:
        return 0


n = 1000
ages = np.random.randint(20, 70, n)
credit_histories = np.array([generate_credit_history(age) for age in ages])
incomes = np.random.randint(20000, 80000, n)
loan_approvals = np.array([approve_loan(incomes[i], ages[i], credit_histories[i]) for i in range(n)])

data = {
    'income': incomes,
    'credits_history': credit_histories,
    'age': ages,
    'loan_approval': loan_approvals
}

df = pd.DataFrame(data)

df.to_json('loan_data_large.json', orient='records')
