import {useState} from "react";
import {Message, User, Content, ContentFlex, Options, Option} from "./Message.styles.js";

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
        <Message className="message message-bot animate__animated animate__fadeInUp">
            <User>Bot</User>
            <ContentFlex>
                <Content className={getContentClassName(content)}>{content}</Content>
                {options && (
                    <Options>
                        {options.map((option, index) => (
                            <Option
                                key={index}
                                className={`option ${selectedOption === option ? 'selected' : ''}`}
                                onClick={() => !isOptionSelected && handleOptionClick(option)}
                            >
                              <span>
                                <span className="icon material-symbols-rounded">{selectedOption === option ? 'done' : ''}</span>
                                  {option}
                              </span>
                            </Option>
                        ))}
                    </Options>
                )}
            </ContentFlex>
        </Message>
    );
};

const MessageUser = ({ content, options }) => {
    return (
        <Message className="message message-user animate__animated animate__fadeInUp">
            <User>You</User>
            <ContentFlex>
                <Content className={getContentClassName(content)}>{content}</Content>
            </ContentFlex>
        </Message>
    );
};

export { MessageBot, MessageUser };