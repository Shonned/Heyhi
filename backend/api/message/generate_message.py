import random

messages_accept = [
    "Congratulations! Your loan application has been approved.",
    "Your loan application has been successfully approved.",
    "We are pleased to inform you that your loan has been accepted.",
    "You have been approved for the requested loan.",
    "Your loan application has met our approval."
]

messages_reject = [
    "We're sorry, but your loan application has been rejected.",
    "Unfortunately, we cannot approve your loan application at this time.",
    "Your loan application has been declined.",
    "We regret to inform you that your loan application has not been accepted.",
    "Your loan application does not meet our approval criteria."
]

details_accept = [
    "Your loan will be available starting next week.",
    "The approved loan amount is $10,000.",
    "The interest rate for your loan will be 3.5%.",
    "Please visit the bank to finalize the loan formalities.",
    "We will send you the loan agreement details via email shortly."
]

details_reject = [
    "The credit score does not meet our minimum criteria.",
    "We found insufficient income for the requested amount.",
    "Your payment history shows repeated delays.",
    "We cannot approve the loan due to lack of collateral.",
    "Your financial information does not meet our loan requirements."
]


def random_message(accepted):
    if accepted:
        return random.choice(messages_accept) + " " + random.choice(details_accept)
    else:
        return random.choice(messages_reject) + " " + random.choice(details_reject)
