import {
    HistoryContainer,
    HistoryContent,
    HistoryHeader,
    SearchBar,
    HistoryMessages,
    HistoryMessage,
    Time,
    HistoryNotLogged,
    HistoryNotLoggedContent,
} from './History.styles.js';
import Input from "@components/Form/Input/Input.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ring} from 'ldrs'
import {PiWarningOctagonBold} from "react-icons/pi";
import axios from "axios";

ring.register()

const History = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [history, setHistory] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const fetchHistory = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/conversation/get_all/' + props.user.uid);
            const sortedHistory = response.data.sort((a, b) => {
                const dateA = new Date(a.conversation_info.updated_at);
                const dateB = new Date(b.conversation_info.updated_at);
                return dateB - dateA;
            });
            setHistory(sortedHistory);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (props.logged) {
            fetchHistory();
        }
    }, [props.logged, props.notifyHistory]);

    const redirectToChat = (conv_uid) => {
        navigate(`/chat/${conv_uid}`);
    }

    const formatToEnglishDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-EN', {timeZone: 'UTC'});
    };

    return (
        <HistoryContainer>
            <HistoryContent>
                <HistoryHeader>
                    <h2 className="title">History</h2>
                </HistoryHeader>
                {loading && (
                    <l-ring
                        size="23"
                        stroke="3"
                        bg-opacity="0"
                        speed="2"
                        color="white"
                    ></l-ring>
                )}
                {!loading && history && (
                    <HistoryMessages>
                        {history.map((conversation, index) => (
                            <HistoryMessage key={index} className="animate__animated animate__fadeInDown"
                                            onClick={() => redirectToChat(conversation.conversation_id)}>
                                <Time>
                                    <span className="material-symbols-rounded">
                                        schedule
                                    </span> {formatToEnglishDate(conversation.conversation_info.updated_at)}
                                </Time>
                                {conversation.messages.length > 0 && (
                                    <div>{conversation.messages[conversation.messages.length - 1].content}</div>
                                )}
                            </HistoryMessage>
                        ))}
                    </HistoryMessages>
                )}
                {!props.logged && (
                    <HistoryNotLogged>
                        <HistoryNotLoggedContent>
                            <PiWarningOctagonBold
                                style={{fontSize: '45px', color: 'var(--light-grey-color)', marginBottom: '10px'}}/>
                            <span>Log in to view your history</span>
                        </HistoryNotLoggedContent>
                    </HistoryNotLogged>
                )}
            </HistoryContent>
        </HistoryContainer>
    );
};

export default History;