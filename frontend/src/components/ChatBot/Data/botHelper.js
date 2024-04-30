import { loanApplicationOptions, othersOptions } from './botData';

export const getBotResponseByOption = (option) => {
    switch (option) {
        case 'Loan application':
            return {
                name: 'loan_application_help',
                content: "Sure, I can help you with a loan application. Which type of loan are you interested in?",
                isBot: true,
                options: loanApplicationOptions,
            };
        case 'Personal loan':
            return {
                name: 'personal_loan_amount',
                content: "Amount",
                isBot: true,
            };
        // ...
    }
};