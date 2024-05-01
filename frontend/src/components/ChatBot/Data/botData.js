export const refusedOptions = ['Yes', 'No'];
export const agreedOptions = ['I\'m satisfied with the explanation', 'I\'ll need a solution or an alternative'];

const botResponses = [
    {
        name: 'refused',
        content: "I'm sorry to inform you that your loan application has been rejected. Would you like an explanation?",
        isBot: true,
        options: refusedOptions,
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
