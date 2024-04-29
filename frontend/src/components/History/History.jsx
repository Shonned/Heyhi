import './History.css'
import 'animate.css';
import Input from "../Form/Input/Input.jsx";
import {useState} from "react";
import _ from 'lodash';

const History = () => {

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
        <div className="history">
            <div className="history-content">
                <div className="history-header">
                    <h2 className="title">History</h2>
                    <div className="search-bar">
                        <Input
                            type="text"
                            placeholder="Rechercher..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            icon={'search'}
                        />
                    </div>
                </div>
                <div className="history-messages">
                    <div className="history-message active animate__animated animate__fadeInDown">
                        <div className="time">
                            <span className="material-symbols-rounded">
                                schedule
                            </span>
                            Wed. 9:32am
                        </div>
                        {truncatedText}
                    </div>
                    <div className="history-message animate__animated animate__fadeInDown">
                        <div className="time">
                            <span className="material-symbols-rounded">
                                schedule
                            </span>
                            Wed. 9:32am
                        </div>
                        {truncatedText}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default History;