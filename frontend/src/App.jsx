import Sidebar from "./components/Sidebar/Sidebar.jsx";
import History from "./components/History/History.jsx";
import ChatBot from "./components/ChatBot/ChatBot.jsx";
import Modal from "./components/Utils/Modal/Modal.jsx";
import {useState} from "react";

import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [modals, setModals] = useState({});

    const handleOpenModal = (modalId) => {
        setModals((prevModals) => ({ ...prevModals, [modalId]: true }));
    };

    const handleCloseModal = (modalId) => {
        setModals((prevModals) => ({ ...prevModals, [modalId]: false }));
    };

    return (
        <>
            <div className="app">
                <Sidebar onOpenModal={handleOpenModal} />
                <History />
                <ChatBot />
                {modals.login && <Modal modalId="login" onClose={handleCloseModal} />}
                {modals.register && <Modal modalId="register" onClose={handleCloseModal} />}
                {modals.settings && <Modal modalId="settings" onClose={handleCloseModal} />}
                <ToastContainer />
            </div>
        </>
    );
}

export default App;