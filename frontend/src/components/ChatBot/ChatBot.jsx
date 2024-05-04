import {
    ChatbotContainer,
    ChatbotContent,
    ChatbotMessages,
    ChatbotForm,
    StyledChatbotButton
} from './ChatBot.styles.js';
import {useRef, useState} from "react";
import axios from 'axios';
import { MessageBot, MessageUser } from './Message/Message.jsx';
import Input from "@components/Form/Input/Input.jsx";
import { getBotResponseByName } from './Data/botData.js';

const ChatBot = () => {
    const [request, setRequest] = useState('');
    const chatbotContentRef = useRef(null);
    const [pendingResponse, setPendingResponse] = useState(false);

    const [messages, setMessages] = useState([
        {
            content: getBotResponseByName('select_assistant').content,
            isBot: true,
            options: getBotResponseByName('select_assistant').options
        },
    ]);

    const sendMessage = async () => {
        if (request) {
          addMessage(request);
          setRequest('');
          setPendingResponse(true);

          try {
            const response = await axios.post('http://localhost:5000/api/chatbot', { request });
            const botResponse = response.data;
            console.log(botResponse)
            addMessage(botResponse.content, true, botResponse.options);
          } catch (error) {
            console.error(error);
            addMessage('An error occurred while processing your request.', true);
          }

          setPendingResponse(false);
        }
    };

    const handleOptionClick = async (option) => {
        addMessage(option);
        setPendingResponse(true);

        try {
          const response = await axios.post('http://localhost:5000/api/chatbot', { option });
          const botResponse = response.data;
          addMessage(botResponse.content, true, botResponse.options);
        } catch (error) {
          console.error(error);
          addMessage('An error occurred while processing your request.', true);
        }

        setPendingResponse(false);
    };

    const addMessage = (content, isBot = false, options = []) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { content, isBot, options },
        ]);
        chatbotContentRef.current.scrollTo({
          top: chatbotContentRef.current.scrollHeight,
          behavior: 'smooth'
        });
    };

    const handleRequest = (e) => {
        setRequest(e.target.value);
    }

    const lastMessageHasOptions = messages.length > 0 && messages[messages.length - 1].options.length > 0

    return (
        <ChatbotContainer className="chatbot">
            <ChatbotContent className="chatbot-content" ref={chatbotContentRef}>
                <ChatbotMessages className="chatbot-messages">
                    {messages.map((message, index) =>
                        message.isBot ? (
                            <MessageBot
                                key={index}
                                content={message.content}
                                options={message.options}
                                onOptionClick={handleOptionClick}
                            />
                        ) : (
                            <MessageUser key={index} content={message.content}/>
                        )
                    )}
                </ChatbotMessages>
            </ChatbotContent>
            <ChatbotForm className="chatbot-form">
                <Input
                    type="text"
                    placeholder="Aa"
                    onChange={handleRequest}
                    value={request}
                    disabled={pendingResponse || lastMessageHasOptions}
                />
                <StyledChatbotButton className="button" onClick={sendMessage} text="Send" icon="send" loading={pendingResponse}/>
            </ChatbotForm>
        </ChatbotContainer>
    );
}

export default ChatBot;