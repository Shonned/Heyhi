import {useState} from "react";
import {Message, User, Content, ContentFlex, Options, Option} from "./Message.styles.js";

const getContentClassName = (content) => {
    return content.length <= 50 ? 'content short-content' : 'content';
};

const MessageBot = (props) => {

    const [selectedOption, setSelectedOptions] = useState(null);
    const [isOptionSelected, setIsOptionSelected] = useState(false);

    const handleOptionClick = (option) => {
        setSelectedOptions(option);
        setIsOptionSelected(true);
        props.onOptionClick(option);
    }

    return (
        <Message className="message message-bot animate__animated animate__fadeInUp">
            <User>B</User>
            <ContentFlex>
                <Content className={getContentClassName(props.content)}>{props.content}</Content>
                {props.options && (
                    <Options>
                        {props.options.map((option, index) => (
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

const MessageUser = (props) => {
    return (
        <Message className="message message-user animate__animated animate__fadeInUp">
            <User>Y</User>
            <ContentFlex>
                <Content className={getContentClassName(props.content)}>{props.content}</Content>
            </ContentFlex>
        </Message>
    );
};

export { MessageBot, MessageUser };