import pandas as pd
import numpy as np
import ast
import random

# Define the feature actionability taxonomy
feature_classes_credit = {
    "person_age": "NSI",
    "person_income": "DM",
    "person_home_ownership": "IM",
    "person_emp_length": "IM",
    "loan_intent": "IM",
    "loan_grade": "DM",
    "loan_amnt": "DM",
    "loan_int_rate": "DM",
    "loan_percent_income": "DM",
    "cb_person_cred_hist_length": "IM"
}

# Define templates for each feature actionability class
templates = {
    "DM": "{ACTION} your {FEATURE} from {QUERY_VALUE} to {CF_VALUE} is suggested.",
    "IM": "Take steps to {ACTION} your {FEATURE} from {QUERY_VALUE} to {CF_VALUE} as an important step.",
    "NSI": "While your {FEATURE} at {QUERY_VALUE} is a given, note that a {FEATURE} of {CF_VALUE} is typically seen with desired outcomes.",
    "SI": "Your {FEATURE}, at {QUERY_VALUE}, is an unchangeable factor. Still, it’s important to understand how a {FEATURE} of {CF_VALUE} relates to the outcome."
}

# Causal relationships dictionary
causal_relationships_credit = {
    "person_income": ["loan_int_rate"],
    "person_home_ownership": ["loan_percent_income"],
    "loan_history": ["loan_intent"],
    "person_emp_length": ["loan_intent"],
    "loan_amount": ["loan_percent_income"],
    "credit_history_length": []
}
# Dictionary for mapping feature code names to human-friendly names
feature_name_mapping = {
    "person_emp_length": "Employment Length (years)",
    "person_age": "Age",
    "cb_person_cred_hist_length": "Credit History Length (years)",
    "loan_amnt": "Loan Amount",
    "loan_percent_income": "Loan as Percentage of Income",
    "person_home_ownership": "Home Ownership Status",
    "person_income": "Income",
    "loan_intent": "Loan Intent",
    "loan_grade": "Loan Grade",
    "loan_int_rate": "Loan Interest Rate"
}

feature_changes_order = ['person_home_ownership', 'person_age', 'loan_amnt', 'loan_int_rate', 'person_emp_length',
                         'loan_grade', 'cb_person_cred_hist_length', 'loan_percent_income', 'person_income']

# Function to determine the action based on value changes
def determine_action(query_value, cf_value, class_):
    cat_changes = ["change", "modify", "adjust"]
    increase = ["increase", "raise", "elevate"]
    decrease = ["decrease", "lower", "reduce"]
    # Numeric feature and value changes
    if isinstance(query_value, (int, float)) and isinstance(cf_value, (int, float)):
        if query_value < cf_value:
            return random.choice(increase)
        elif query_value > cf_value:
            return random.choice(decrease)
    # Categorical feature or no change in numeric value
    return random.choice(cat_changes)


# Modified function to generate counterfactual explanations without repeating children
def generate_counterfactual_explanations(query, counterfactual):
    explanations = []
    mentioned_features = set()  # Track mentioned features to avoid repetition
    for feature in feature_changes_order:
        if feature in query and feature in counterfactual:
            # Check if the feature or its value has changed
            value_changed = query[feature] != counterfactual[feature]
            if value_changed or feature in causal_relationships_credit:
                mentioned_features.add(feature)  # Mark feature as mentioned
                class_ = feature_classes_credit.get(feature, "")
                action = determine_action(query[feature], counterfactual[feature], class_)
                human_friendly_feature_name = feature_name_mapping.get(feature, feature.replace('_', ' '))
                template = templates.get(class_, "")
                if value_changed:
                    # Generate explanation for features that have changed
                    explanation = template.format(
                        ACTION=action,
                        FEATURE=human_friendly_feature_name,
                        QUERY_VALUE=query[feature],
                        CF_VALUE=counterfactual[feature]
                    )
                    explanations.append(explanation)
                # Handle causal relationships
                if feature in causal_relationships_credit:
                    for child in causal_relationships_credit[feature]:
                        if child not in mentioned_features:  # Check if child feature hasn't been mentioned before
                            child_class = feature_classes_credit.get(child, "")
                            child_action = determine_action(query.get(child, None), counterfactual.get(child, None),
                                                            child_class)
                            child_explanation = f"Additionally, {human_friendly_feature_name} influences {feature_name_mapping.get(child, child.replace('_', ' '))}, which may {child_action}."
                            explanations.append(child_explanation)
                            mentioned_features.add(child)  # Mark child as mentioned
        else:
            explanations.append(f"The feature '{feature}' is not present in the provided data.")
    return explanations


# # Assume the necessary variables (query, counterfactual, feature_changes_order, etc.) are defined elsewhere
# explanations_list = generate_counterfactual_explanations(q, c, order, feature_classes_credit, templates, causal_relationships_credit, feature_name_mapping)

# Function to format explanations into a single string
def format_explanations(explanations, prefix):
    flattened_explanations = [item for sublist in explanations for item in sublist]
    return f"{prefix}:\n\n" + "\n".join(flattened_explanations)
