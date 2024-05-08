import Sidebar from "./components/Sidebar/Sidebar.jsx";
import History from "./components/History/History.jsx";
import ChooseAssistant from "./components/ChatBot/ChooseAssistant.jsx";
import Modal from "./components/Utils/Modal/Modal.jsx";
import {useEffect, useState} from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {auth} from "@components/Form/Firebase.jsx";

import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Conversation from "@components/ChatBot/Conversation.jsx";

function App() {
    const [user, setUser] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
            setAuthChecked(true);
        })
    }, []);

    const [modals, setModals] = useState({});

    const handleOpenModal = (modalId) => {
        setModals((prevModals) => {
            const newModals = { ...prevModals, [modalId]: true };
            for (const key in newModals) {
                if (key !== modalId) {
                    newModals[key] = false;
                }
            }
            return newModals;
        });
    };

    const handleCloseModal = (modalId) => {
        setModals((prevModals) => ({ ...prevModals, [modalId]: false }));
    };

    return (
        <Router>
            <div className="app">
                <Sidebar onOpenModal={handleOpenModal} user={user}/>
                <History onOpenModal={handleOpenModal} user={user} />
                <Switch>
                    <Route path="/chat/:id">
                        <Conversation user={user} />
                    </Route>
                    <Route path="/">
                        <ChooseAssistant user={user} />
                    </Route>
                </Switch>
                {modals.login && <Modal modalId="login" onOpenModal={handleOpenModal} onClose={handleCloseModal} />}
                {modals.register && <Modal modalId="register" onOpenModal={handleOpenModal} onClose={handleCloseModal} />}
                {modals.settings && <Modal modalId="settings" onClose={handleCloseModal} />}
                <ToastContainer theme="dark"/>
            </div>
        </Router>
    );
}

export default App;