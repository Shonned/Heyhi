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
import {useNavigate} from "react-router-dom";

const ChooseAssistant = (props) => {
    const [assistant, setAssistant] = useState(null);
    const [pendingResponse, setPendingResponse] = useState(false);
    const [request, setRequest] = useState('');
    const chatbotContentRef = useRef(null);
    const delay = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
    const navigate = useNavigate();

    const [messages, setMessages] = useState([
        {content: 'Welcome to Heyhi!', isBot: true},
    ]);

    const [userResponses, setUserResponses] = useState({});
    const questions = [
        {
            key: 'select_assistant',
            question: 'To get started choose a virtual assistant.',
            options: ['Loan Assistant', 'Health Assistant']
        },
        {key: 'person_age', question: 'What is your age?'},
        {key: 'person_income', question: 'What is your income?'},
        {
            key: 'person_home_ownership',
            question: 'Do you own a home?',
            options: ['OWN', 'RENT', 'MORTGAGE']
        },
        {key: 'person_emp_length', question: 'How many years have you been employed?'},
        {
            key: 'loan_intent',
            question: 'What is the purpose of the loan?',
            options: ['HOMEIMPROVEMENT', 'DEBTCONSOLIDATION', 'BUSINESS', 'PERSONAL']
        },
        {
            key: 'loan_grade',
            question: 'What is the loan grade?',
            options: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
        },
        {key: 'loan_amnt', question: 'What is the loan amount?'},
        {key: 'loan_int_rate', question: 'What is the loan interest rate?'},
        {key: 'loan_percent_income', question: 'What percentage of your income will go to loan payments?'},
        {
            key: 'cb_person_default_on_file',
            question: 'Do you have any defaults on file?',
            options: ['Y', 'N']
        },
        {key: 'cb_person_cred_hist_length', question: 'How long is your credit history?'},
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleResponseOptionClick = (option) => {
        const currentQuestion = questions[currentQuestionIndex];
        const key = currentQuestion.key;

        if (key === 'select_assistant') {
            setAssistant(option);
        }

        setUserResponses({ ...userResponses, [key]: option });
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handleInputChange = (event) => {
        setRequest(event.target.value);
    };

    const handleSendResponse = () => {
        const key = questions[currentQuestionIndex].key;
        let response = request;

        if (!isNaN(response) && key !== 'loan_int_rate' && key !== 'loan_percent_income') {
            response = parseInt(response, 10);
        } else if (!isNaN(response) && (key === 'loan_int_rate' || key === 'loan_percent_income')) {
            response = parseFloat(response);
        }

        setUserResponses({...userResponses, [key]: response});
        setRequest('');
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };


    useEffect(() => {
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            addMessage(currentQuestion.question, true, currentQuestion.options || []);
        } else {
            handleCreateConversation();
        }
    }, [currentQuestionIndex]);

    const handleCreateConversation = async () => {
        setPendingResponse(true);
        setTimeout(async () => {
            try {
                const formData = new FormData();

                const additionalData = {
                    user_uid: props.user.uid,
                    assistant: assistant
                };

                const additionalDataBlob = new Blob([JSON.stringify(additionalData)], {type: 'application/json'});
                const userDataBlob = new Blob([JSON.stringify(userResponses)], {type: 'application/json'});

                formData.append("additional_data", additionalDataBlob);
                formData.append("user_data", userDataBlob)

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
                                onOptionClick={message.options ? handleResponseOptionClick : null}
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
                    value={request}
                    onChange={handleInputChange}
                    disabled={pendingResponse || currentQuestionIndex >= questions.length || !!questions[currentQuestionIndex]?.options}
                />
                <StyledChatbotButton className="button icon_only send" icon="arrow_upward"
                                     onClick={handleSendResponse}
                                     loading={pendingResponse}
                                     disabled={request === '' || pendingResponse || !!questions[currentQuestionIndex]?.options}/>
            </ChatbotForm>
        </ChatbotContainer>
    );
}

export default ChooseAssistant;