import Sidebar from "./components/Sidebar/Sidebar.jsx";
import History from "./components/History/History.jsx";
import ChatBot from "./components/ChatBot/ChatBot.jsx";
import Modal from "./components/Utils/Modal/Modal.jsx";
import {useEffect, useState} from "react";
import {auth} from "@components/Form/Firebase.jsx";

import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
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
        <>
            <div className="app">
                <Sidebar onOpenModal={handleOpenModal} user={user}/>
                <History onOpenModal={handleOpenModal} user={user} />
                <ChatBot user={user} />
                {modals.login && <Modal modalId="login" onOpenModal={handleOpenModal} onClose={handleCloseModal} />}
                {modals.register && <Modal modalId="register" onOpenModal={handleOpenModal} onClose={handleCloseModal} />}
                {modals.settings && <Modal modalId="settings" onClose={handleCloseModal} />}
                <ToastContainer theme="dark"/>
            </div>
        </>
    );
}

export default App;