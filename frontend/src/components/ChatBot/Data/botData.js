export const selectAssistant = ['Loan Assistant', 'Health Assistant'];

const botResponses = [
  {
    name: 'select_assistant',
    content: 'Welcome to Heyhi, to get started choose a virtual assistant.',
    isBot: true,
    options: selectAssistant,
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