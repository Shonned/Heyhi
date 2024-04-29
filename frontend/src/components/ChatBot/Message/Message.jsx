import './Message.css'
import 'animate.css';
import {useState} from "react";

const getContentClassName = (content) => {
    return content.length <= 50 ? 'content short-content' : 'content';
};

const MessageBot = ({ content, options, onOptionClick }) => {

    const [selectedOption, setSelectedOptions] = useState(null);
    const [isOptionSelected, setIsOptionSelected] = useState(false);

    const handleOptionClick = (option) => {
        setSelectedOptions(option);
        setIsOptionSelected(true);
        onOptionClick(option);
    }

    return (
        <div className="message message-bot animate__animated animate__fadeInUp">
            <div className="user">Bot</div>
            <div className="content-flex">
                <div className={getContentClassName(content)}>{content}</div>
                {options && (
                    <div className="options">
                        {options.map((option, index) => (
                            <div key={index}
                                 className={`option ${selectedOption === option ? 'selected' : ''}`}
                                 onClick={() => !isOptionSelected && handleOptionClick(option)}
                            >
                                <span>
                                    <span className="emoji">{selectedOption === option ? '🎉' : ''}</span>
                                    {option}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const MessageUser = ({ content, options }) => {
    return (
        <div className="message message-user animate__animated animate__fadeInUp">
            <div className="user">You</div>
            <div className="content-flex">
                <div className={getContentClassName(content)}>{content}</div>
            </div>
        </div>
    );
};

export { MessageBot, MessageUser };