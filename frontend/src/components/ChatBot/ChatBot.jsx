import './ChatBot.css'
import Input from "../Form/Input/Input.jsx";
import {useState} from "react";
import Message from "./Message/Message.jsx";
import SelectAssistant from "./SelectAssistant/SelectAssistant.jsx";

const ChatBot = () => {

    const [requestTerm, setRequestTerm] = useState('');

    const handleRequestChange = (event) => {
        setRequestTerm(event.target.value);
    };

    return (
        <div className="chatbot">
            <div className="chatbot-content">
                <SelectAssistant />
                <div className="chatbot-messages">
                    <Message />
                </div>
                <div className="chatbot-form">
                    <Input
                        type="text"
                        placeholder="Aa"
                        onChange={handleRequestChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default ChatBot;