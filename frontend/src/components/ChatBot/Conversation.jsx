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
import {useParams} from "react-router-dom";

const Conversation = (props) => {
    const {id} = useParams();
    const [request, setRequest] = useState('');
    const chatbotContentRef = useRef(null);
    const [disabled, setDisabled] = useState(true);
    const [pendingResponse, setPendingResponse] = useState(false);
    const [conversation, setConversation] = useState(null);
    const [explanationDisplayed, setExplanationDisplayed] = useState(false);
    const [explanation, setExplanation] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!id) {
            if (history.location.pathname !== '/') {
                history.push('/');
            }
            return;
        }
        const fetchData = async () => {
            try {
                if (id) {
                    const response = await axios.get(`http://localhost:8000/api/conversation/get/${id}`);
                    setConversation(response.data);
                    setMessages([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id, history]);

    useEffect(() => {
        if (conversation && messages.length === 0) {
            const formattedMessages = conversation.messages.map(message => ({
                content: message.content,
                isBot: message.isBot,
                options: message.options || [],
            }));

            if (messages.length === 0) {
                formattedMessages.forEach(message => {
                    if(!conversation.conversation_info.accepted) {
                        addMessage(message.content, message.isBot, ['Get solutions']);
                    } else {
                        addMessage(message.content, message.isBot, []);
                    }
                });
            }
        }

        const fetchExplanation = async () => {
            if (conversation) {
                if (!conversation.conversation_info.accepted) {
                    try {
                        if (id) {
                            const response = await axios.get(
                                `http://localhost:8000/api/conversation/get/${id}/explanation`);
                            setExplanation(response.data.explanations);
                        }
                    } catch (error) {
                        console.error('Error fetching data:', error);
                    }
                }
            }
        }

        fetchExplanation();

    }, [conversation, messages]);

    const sendRequest = async (request) => {
        setRequest('');
        setPendingResponse(true);
        if (explanation) {
           addMessage(explanation, true, []);
        }
    };

    const handleOptionClick = (option) => {
        sendRequest(option);
    };

    const handleInputSubmit = (event) => {
        event.preventDefault();
        if (request) {
            sendRequest(request);
        }
    };

    const addMessage = (content, isBot = false, options = []) => {
        setMessages((prevMessages) => [
            ...(prevMessages || []),
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

    return (
        <ChatbotContainer className="chatbot">
            <ChatbotContent className="chatbot-content" ref={chatbotContentRef}>
                <ChatbotMessages className="chatbot-messages">
                    {messages && messages.map((message, index) =>
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
                    disabled={pendingResponse}
                />
                <StyledChatbotButton className="button icon_only send" onClick={handleInputSubmit} icon="arrow_upward"
                                     loading={pendingResponse} disabled={disabled}/>
            </ChatbotForm>
        </ChatbotContainer>
    );
}

export default Conversation;