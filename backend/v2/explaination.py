import random
import pandas as pd

feature_classes = {
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

templates = {
    "DM": [
        "{ACTION} {FEATURE} from {QUERY_VALUE} value to {CF_VALUE}",
        "{ACTION} {FEATURE} to {CF_VALUE}"
    ],
    "IM": [
        "{VERB} {OBJECT} to {ACTION} {FEATURE} from {QUERY_VALUE} to {CF_VALUE}",
        "{VERB} {OBJECT} to {ACTION} {FEATURE} to {CF_VALUE}"
    ],
    "NSI": [
        "Having a value of {CF_VALUE} for {FEATURE} would provide a {COMPARATIVE} chance of {DESIRED_OUTCOME} compared to a value of {QUERY_VALUE}"
    ],
    "SI": [
        "{POSSESSIVE} {FEATURE} has contributed to {OUTCOME}"
    ],
}


def determine_action_word(query_value, cf_value):
    is_categorical = isinstance(query_value, str)

    if is_categorical:
        return random.choice(["change", "modify"])
    else:
        if cf_value > query_value:
            return random.choice(["increase", "raise"])
        else:
            return random.choice(["decrease", "reduce"])


def generate_counterfactual_explanation(feature, query_value, cf_value, actionability_class):
    template = random.choice(templates[actionability_class])
    action_word = determine_action_word(query_value, cf_value)

    placeholders = {
        "{VERB}": ["Take", "Initiate", "Undertake", "Pursue", "Negotiate"],
        "{OBJECT}": ["steps", "measures", "actions"],
        "{ACTION}": [action_word],
        "{COMPARATIVE}": ["increase", "higher", "better"],
        "{DESIRED_OUTCOME}": ["accepted", "pass"],
        "{OUTCOME}": ["heart disease"],
        "{POSSESSIVE}": ["Your"],
        "{FEATURE}": [feature],
        "{QUERY_VALUE}": [query_value],
        "{CF_VALUE}": [cf_value],
    }

    for placeholder, values in placeholders.items():
        template = template.replace(placeholder, str(random.choice(values)))

    return template


def generate_explanation(feature, query_value, cf_value, actionability_class, causality_dict, changed_features):
    is_categorical = isinstance(query_value, str)
    explanation = generate_counterfactual_explanation(feature, query_value, cf_value, actionability_class)

    # Check for parent features that influence the current feature
    parent_features = [parent for parent, children in causality_dict.items() if feature in children]

    # Filter out parent features that are already changed or are immutable
    parent_features = [parent for parent in parent_features if
                       parent not in changed_features and feature_classes[parent] not in ["non_sensitive_immutable",
                                                                                          "sensitive_immutable"]]

    if parent_features:
        parent_str = ', '.join(parent_features[:-1]) + ' and ' + parent_features[-1] if len(parent_features) > 1 else \
        parent_features[0]
        explanation += f". Please note that this change is influenced by your {parent_str} levels."

    return explanation


def generate_explanations(query, counterfactual, user_actionability_classes=None):
    explanations = []
    additional_info = []
    changed_features = set()

    if user_actionability_classes is None:
        user_actionability_classes = {}

    mutable_count = 0

    for feature in query.keys():
        query_value = query[feature]
        cf_value = counterfactual[feature]

        # Skip if the feature value has not changed
        if query_value == cf_value:
            continue

        actionability_class = feature_classes.get(feature, "NSI")
        changed_features.add(feature)  # Keep track of changed features

        explanation = generate_explanation(feature, query_value, cf_value, actionability_class, {}, changed_features)
        if actionability_class in ["DM", "IM"]:
            mutable_count += 1
            explanations.append(f"{mutable_count}. {explanation}")
        else:
            additional_info.append(explanation)

    if mutable_count > 0:
        result = f"You need to change {mutable_count} features:\n" + "\n".join(explanations)
    else:
        result = "No feature changes are necessary."

    if additional_info:
        result += "\n\nAdditional information:\n" + "\n".join(additional_info)

    return result
