import './ChatBot.css'
import Input from "../Form/Input/Input.jsx";
import {useRef, useState} from "react";
import { MessageBot, MessageUser } from './Message/Message.jsx';
import SelectAssistant from "./SelectAssistant/SelectAssistant.jsx";
import Button from "../Form/Button/Button.jsx";

const ChatBot = () => {

    // Placeholder
    const welcome = "Welcome on Heyhi, choose your case below :";
    const startOptions = ['Loan application', 'Others'];

    const [request, setRequest] = useState('');
    const chatbotContentRef = useRef(null);

    const [messages, setMessages] = useState([
        { content: welcome, isBot: true, options: startOptions },
    ]);

    const sendMessage = () => {
        if (request) {
            addMessage(request);
            setRequest('');
        }
    };

    const handleOptionClick = (option) => {
        addMessage(option);
    };

    const addMessage = (content) => {
        setMessages([...messages, { content, isBot: false }]);
        chatbotContentRef.current.scrollTo({
            top: chatbotContentRef.current.scrollHeight,
            behavior: 'smooth'
        });
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
                />
                <Button onClick={sendMessage} text="Send" icon="send" />
            </div>
        </div>
    )
}

export default ChatBot;