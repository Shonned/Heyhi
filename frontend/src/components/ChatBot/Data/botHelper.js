import { agreedOptions } from './botData';

export const getBotResponseByOption = (option) => {
    switch (option) {
        case 'Yes':
            return {
                name: 'loan_application_explanation',
                content: "I see that your number of working hours per week is only 20h, our system requires a minimum of 30h to be able to proceed with the loan application.",
                isBot: true,
                options: agreedOptions,
            };
        case 'No':
            return {
                name: 'loan_application_thanks',
                content: "Thank you for trusting us",
                isBot: true,
            };
        case 'I\'m satisfied with the explanation':
            return {
                name: 'loan_application_thanks',
                content: "Thank you for trusting us",
                isBot: true,
            };
        case 'I\'ll need a solution or an alternative':
            return {
                name: 'loan_application_no_alternative',
                content: "Unfortunately no alternative is available for your case.",
                isBot: true,
            };
    }
};