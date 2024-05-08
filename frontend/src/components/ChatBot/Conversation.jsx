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
import {useParams} from "react-router-dom";

const Conversation = (props) => {
    const {id} = useParams();
    const [request, setRequest] = useState('');
    const chatbotContentRef = useRef(null);
    const [pendingResponse, setPendingResponse] = useState(false);
    const [conversation, setConversation] = useState(null);

    useEffect(() => {
        if (!id) {
            history.push('/'); // Redirige vers la page d'accueil si l'ID n'existe pas
            return;
        }
        const fetchData = async () => {
            try {
                if (id) {
                    const response = await axios.get(`http://localhost:8000/api/conversation/get/${id}`);
                    setConversation(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        setConversation(conversation)
    }, [conversation]);

    const [messages, setMessages] = useState([
        {
            content: getBotResponseByName('select_assistant').content,
            isBot: true,
            options: getBotResponseByName('select_assistant').options
        },
    ]);

    const sendRequest = async (input) => {
        addMessage(input);
        setRequest('');
        setPendingResponse(true);
        const delay = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
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
            ...prevMessages,
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

    const lastMessageHasOptions = messages.length > 0 && messages[messages.length - 1].options.length > 0

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
                <Input
                    type="text"
                    placeholder="Aa"
                    onChange={handleRequest}
                    value={request}
                    disabled={pendingResponse || lastMessageHasOptions}
                />
                <StyledChatbotButton className="button" onClick={handleInputSubmit} text="Send" icon="send"
                                     loading={pendingResponse}/>
            </ChatbotForm>
        </ChatbotContainer>
    );
}

export default Conversation;