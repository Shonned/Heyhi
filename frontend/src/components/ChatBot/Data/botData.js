export const startOptions = ['Loan application', 'Others'];
export const loanApplicationOptions = ['Personal loan', 'Business loan', 'Mortgage'];
export const othersOptions = ['Account balance', 'Transaction history', 'Customer support'];

const botResponses = [
    {
        name: 'welcome',
        content: "Hello, how can I assist you today?",
        isBot: true,
        options: startOptions,
    },
    {
        name: 'error',
        content: "An error has occurred.",
        isBot: true,
    }
];

export const getBotResponseByName = (name) => {
    return botResponses.find((response) => response.name === name);
};
