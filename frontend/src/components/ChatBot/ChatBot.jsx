import './ChatBot.css'
import Input from "../Form/Input/Input.jsx";
import {useRef, useState} from "react";
import { MessageBot, MessageUser } from './Message/Message.jsx';
import SelectAssistant from "./SelectAssistant/SelectAssistant.jsx";
import Button from "../Form/Button/Button.jsx";

import { getBotResponseByName } from './Data/botData.js';
import { getBotResponseByOption } from './Data/botHelper.js';

const ChatBot = () => {
    const [request, setRequest] = useState('');
    const chatbotContentRef = useRef(null);
    const [pendingResponse, setPendingResponse] = useState(false);

    const [messages, setMessages] = useState([
        { content: getBotResponseByName('welcome').content, isBot: true, options: getBotResponseByName('welcome').options },
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
        <div className="chatbot">
            <div className="chatbot-content" ref={chatbotContentRef}>
                <SelectAssistant/>
                <div className="chatbot-messages">
                    {messages.map((message, index) =>
                        message.isBot ? (
                            <MessageBot key={index} content={message.content} options={message.options} onOptionClick={handleOptionClick} />
                        ) : (
                            <MessageUser key={index} content={message.content}/>
                        )
                    )}
                </div>
            </div>
            <div className="chatbot-form">
                <Input
                    type="text"
                    placeholder="Aa"
                    onChange={handleRequest}
                    value={request}
                    disabled={pendingResponse || lastMessageHasOptions}
                />
                <Button onClick={sendMessage} text="Send" icon="send" loading={pendingResponse}/>
            </div>
        </div>
    )
}

export default ChatBot;