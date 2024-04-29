import './ChatBot.css'
import Input from "../Form/Input/Input.jsx";
import {useRef, useState} from "react";
import { MessageBot, MessageUser } from './Message/Message.jsx';
import SelectAssistant from "./SelectAssistant/SelectAssistant.jsx";
import Button from "../Form/Button/Button.jsx";

const ChatBot = () => {

    // Placeholder
    const longText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    const smallText = "Lorem ipsum dolor sit amet";
    const startOptions = ['Yes', 'No'];

    const [request, setRequest] = useState('');
    const chatbotContentRef = useRef(null);

    const [messages, setMessages] = useState([
        { content: "Hi", isBot: true },
        { content: longText, isBot: true, options: startOptions },
        { content: smallText, isBot: false },
    ]);

    const sendMessage = () => {
        if (request) {
            setMessages([...messages, { content: request, isBot: false }]);
            setRequest('');
            chatbotContentRef.current.scrollTo({
                top: chatbotContentRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    const handleRequest = (e) => {
        setRequest(e.target.value);
    }

    return (
        <div className="chatbot">
            <div className="chatbot-content" ref={chatbotContentRef}>
                <SelectAssistant/>
                <div className="chatbot-messages">
                    {messages.map((message, index) =>
                        message.isBot ? (
                            <MessageBot key={index} content={message.content} options={message.options}/>
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
                />
                <Button onClick={sendMessage} text="Send" icon="send" />
            </div>
        </div>
    )
}

export default ChatBot;