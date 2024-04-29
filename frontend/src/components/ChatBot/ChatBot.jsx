import './ChatBot.css'
import Input from "../Form/Input/Input.jsx";
import {useState} from "react";
import { MessageBot, MessageUser } from './Message/Message.jsx';
import SelectAssistant from "./SelectAssistant/SelectAssistant.jsx";

const ChatBot = () => {

    const longText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    const smallText = "Lorem ipsum dolor sit amet";

    const startOptions = ['Yes', 'No'];

    return (
        <div className="chatbot">
            <div className="chatbot-content">
                <SelectAssistant/>
                <div className="chatbot-messages">
                    <MessageBot content="Bonjour" />
                    <MessageBot content={longText} options={startOptions} />
                    <MessageUser content={smallText}/>
                </div>
            </div>
            <div className="chatbot-form">
                <Input
                    type="text"
                    placeholder="Aa"
                />
            </div>
        </div>
    )
}

export default ChatBot;