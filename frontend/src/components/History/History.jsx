import {
    HistoryContainer,
    HistoryContent,
    HistoryHeader,
    SearchBar,
    HistoryMessages,
    HistoryMessage,
    Time,
} from './History.styles.js';
import Button from "@components/Form/Button/Button.jsx";
import Input from "@components/Form/Input/Input.jsx";
import {useState} from "react";
import _ from 'lodash';

const History = (props) => {

    const [searchTerm, setSearchTerm] = useState('');
    const text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores explicabo facere.";

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const truncatedText = _.truncate(text, {
        length: 80,
        separator: ' ',
        omission: '...',
    });

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
                {props.user && (
                    <HistoryMessages>
                        <HistoryMessage className="active animate__animated animate__fadeInDown">
                            <Time>
                          <span className="material-symbols-rounded">
                            schedule
                          </span> Wed. 9:32am
                            </Time>
                            {truncatedText}
                        </HistoryMessage>
                        <HistoryMessage className="animate__animated animate__fadeInDown">
                            <Time>
                          <span className="material-symbols-rounded">
                            schedule
                          </span> Wed. 9:32am
                            </Time>
                            {truncatedText}
                        </HistoryMessage>
                    </HistoryMessages>
                )}
                {!props.user && (
                    <Button className={"button"}
                            text={"Please log in to view your history."}
                            onClick={() => props.onOpenModal('login')}
                            style={{width: '100%'}}/>
                )}
            </HistoryContent>
        </HistoryContainer>
    );
};

export default History;