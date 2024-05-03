import {
    ChatbotContainer,
    ChatbotContent,
    ChatbotMessages,
    ChatbotForm,
    StyledChatbotButton
} from './ChatBot.styles.js';
import {useRef, useState} from "react";
import { MessageBot, MessageUser } from './Message/Message.jsx';
import Input from "@components/Form/Input/Input.jsx";
import { getBotResponseByName } from './Data/botData.js';
import { getBotResponseByOption } from './Data/botHelper.js';

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

    const sendMessage = () => {
        if (request) {
            addMessage(request);
            setRequest('');
            setPendingResponse(true);

            const delay = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;

            setTimeout(() => {
                const botResponse = getBotResponseByName('error');
                addMessage(botResponse.content, botResponse.isBot, botResponse.options);
                setPendingResponse(false);
            }, delay);
        }
    };

    const handleOptionClick = (option) => {
        addMessage(option);
        setPendingResponse(true);
        const delay = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;

        setTimeout(() => {
            const botResponse = getBotResponseByOption(option);
            addMessage(botResponse.content, botResponse.isBot, botResponse.options);
            setPendingResponse(false);
        }, delay);
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