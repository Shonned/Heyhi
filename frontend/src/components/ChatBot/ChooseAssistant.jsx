import {
    ChatbotContainer,
    ChatbotContent,
    ChatbotMessages,
    ChatbotForm,
    StyledChatbotButton
} from './ChatBot.styles.js';
import {useEffect, useRef, useState} from "react";
import axios from 'axios';
import {MessageBot, MessageUser} from './Message/Message.jsx';
import Input from "@components/Form/Input/Input.jsx";
import {getBotResponseByName} from './Data/botData.js';
import {useNavigate} from "react-router-dom";
import InputFile from "../Form/Input/InputFile.jsx";

const ChooseAssistant = (props) => {
    const [assistant, setAssistant] = useState(null);
    const [userFile, setUserFile] = useState(null);
    const [fileSelected, setFileSelected] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [request, setRequest] = useState('');
    const chatbotContentRef = useRef(null);
    const delay = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
    const [pendingResponse, setPendingResponse] = useState(false);
    const navigate = useNavigate();

    const [messages, setMessages] = useState([
        {
            content: getBotResponseByName('select_assistant').content,
            isBot: true,
            options: getBotResponseByName('select_assistant').options
        },
    ]);

    const handleCreateConversation = async () => {
        console.log(assistant);
        console.log(userFile);
        setPendingResponse(true);
        setTimeout(async () => {
            try {
                const formData = new FormData();
                const additionalData = {
                    user_uid: props.user.uid,
                    assistant: assistant
                };
                const additionalDataBlob = new Blob([JSON.stringify(additionalData)], {type: 'application/json'});
                formData.append("additional_data", additionalDataBlob);
                formData.append("user_data", userFile);

                const response = await axios.post('http://localhost:8000/api/conversation/create', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                const chat_uid = response.data.id;
                navigate(`/chat/` + chat_uid);
            } catch (error) {
                console.error(error);
                addMessage('An error occurred while processing your request.', true);
            }
            setPendingResponse(false);
        }, delay);
    }

    const handleOptionClick = (option) => {
        setAssistant(option);
        setPendingResponse(true)
        setTimeout(async () => {
            addMessage("Please send us your personal information file.", true, [])
            setPendingResponse(false)
        }, delay);
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setUserFile(selectedFile);
        setPendingResponse(true)
        setTimeout(async () => {
            setPendingResponse(false)
        }, delay);
    }

    useEffect(() => {
        if (userFile) {
            setFileSelected(true);
            setDisabled(false);
        } else {
            setFileSelected(false);
            setDisabled(true);
        }
    }, [userFile]);

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
                <InputFile
                    type={"file"}
                    id={"select_file"}
                    icon={"attach_file"}
                    onChange={handleFileChange}
                ></InputFile>
                <Input
                    type="text"
                    placeholder="Aa"
                    value={request}
                    disabled={true}
                />
                <StyledChatbotButton className="button icon_only send" icon="arrow_upward"
                                     onClick={handleCreateConversation}
                                     loading={pendingResponse} disabled={disabled}/>
            </ChatbotForm>
        </ChatbotContainer>
    );
}

export default ChooseAssistant;