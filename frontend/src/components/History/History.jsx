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
import {ring} from 'ldrs'
import {PiWarningOctagonBold} from "react-icons/pi";
import axios from "axios";
import {auth} from "@components/Form/Firebase.jsx";

ring.register()

const History = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [history, setHistory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const fetchHistory = async (user_uid) => {
        try {
            const response = await axios.get('http://localhost:8000/api/conversation/get_all/' + user_uid);
            setHistory(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
            setAuthChecked(true);
            if (user) {
                fetchHistory(user.uid);
            } else {
                setLoading(false);
            }
        });
    }, []);

    return (
        <HistoryContainer>
            <HistoryContent>
                <HistoryHeader>
                    <h2 className="title">History</h2>
                    <SearchBar>
                        <Input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            icon={'search'}
                        />
                    </SearchBar>
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
                            <HistoryMessage key={index} className="animate__animated animate__fadeInDown">
                                <Time>
                    <span className="material-symbols-rounded">
                        schedule
                    </span> {conversation.conversation_info.updated_at}
                                </Time>
                                {conversation.messages.length > 0 && (
                                    <div>{conversation.messages[conversation.messages.length - 1].content}</div>
                                )}
                            </HistoryMessage>
                        ))}
                    </HistoryMessages>
                )}
                {!loading && !user && (
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