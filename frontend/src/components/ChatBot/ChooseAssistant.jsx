import {
    ChatbotContainer,
    ChatbotContent,
    ChatbotMessages,
    ChatbotForm,
    StyledChatbotButton
} from './ChatBot.styles.js';
import {useRef, useState} from "react";
import axios from 'axios';
import {MessageBot, MessageUser} from './Message/Message.jsx';
import Input from "@components/Form/Input/Input.jsx";
import {getBotResponseByName} from './Data/botData.js';

const ChooseAssistant = (props) => {
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

    const sendRequest = async (input) => {
        addMessage(input);
        setRequest('');
        setPendingResponse(true);
        const delay = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;

        setTimeout(async () => {
            try {
                const response = await axios.post('http://localhost:8000/api/conversation/create?user_uid='+ props.user.uid);
                const chat_uid = response.data.id;
                window.location.href = "/chat/" + chat_uid;
            } catch (error) {
                console.error(error);
                addMessage('An error occurred while processing your request.', true);
            }
            setPendingResponse(false);
        }, delay);
    };
    const handleOptionClick = (option) => {
        sendRequest(option);
    };

    const addMessage = (content, isBot = false, options = []) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            {content, isBot, options},
        ]);
        chatbotContentRef.current.scrollTo({
            top: chatbotContentRef.current.scrollHeight,
            behavior: 'smooth'
        });
    };

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
                    value={request}
                    disabled={true}
                />
                <StyledChatbotButton className="button" text="Send" icon="send"
                                     loading={pendingResponse}/>
            </ChatbotForm>
        </ChatbotContainer>
    );
}

export default ChooseAssistant;