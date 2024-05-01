import Sidebar from "./components/Sidebar/Sidebar.jsx";
import History from "./components/History/History.jsx";
import ChatBot from "./components/ChatBot/ChatBot.jsx";
import Modal from "./components/Utils/Modal/Modal.jsx";
import {useState} from "react";

function App() {

    const [modals, setModals] = useState({});

    const handleOpenModal = (modalId) => {
        setModals((prevModals) => ({ ...prevModals, [modalId]: true }));
    };

    const handleCloseModal = (modalId) => {
        setModals((prevModals) => ({ ...prevModals, [modalId]: false }));
    };

    return <>
      <div className="app">
          <Sidebar onOpenModal={handleOpenModal} />
          <History />
          <ChatBot />
          {modals.modal1 && <Modal modalId="modal1" onClose={handleCloseModal} />}
      </div>
    </>
}

export default App
