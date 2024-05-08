import Sidebar from "./components/Sidebar/Sidebar.jsx";
import History from "./components/History/History.jsx";
import ChooseAssistant from "./components/ChatBot/ChooseAssistant.jsx";
import Modal from "./components/Utils/Modal/Modal.jsx";
import {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {auth} from "@components/Form/Firebase.jsx";

import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Conversation from "@components/ChatBot/Conversation.jsx";
import {doc, getDoc} from "firebase/firestore";
import {db} from "./components/Form/Firebase.jsx";

function App() {
    const [userDetails, setUserDetails] = useState(null);

    const fetchUserData = async () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserDetails(docSnap.data());
                    console.log("User details:", docSnap.data());
                } else {
                    console.log("No such document for user with UID:", user.uid);
                }
            } else {
                console.log("User not connected");
            }
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetchUserData();
            console.log("User details:", userDetails);
        };
        fetchData();
    }, []);

    const [modals, setModals] = useState({});

    const handleOpenModal = (modalId) => {
        setModals((prevModals) => {
            const newModals = {...prevModals, [modalId]: true};
            for (const key in newModals) {
                if (key !== modalId) {
                    newModals[key] = false;
                }
            }
            return newModals;
        });
    };

    const handleCloseModal = (modalId) => {
        setModals((prevModals) => ({...prevModals, [modalId]: false}));
    };

    return (
        <Router>
            <div className="app">
                <Sidebar onOpenModal={handleOpenModal} user={userDetails} />
                <History onOpenModal={handleOpenModal} user={userDetails} logged={userDetails !== null} />
                <Switch>
                    <Route path="/chat/:id">
                        <Conversation user={userDetails}/>
                    </Route>
                    <Route path="/">
                        <ChooseAssistant user={userDetails}/>
                    </Route>
                </Switch>
                {modals.login && <Modal modalId="login" onOpenModal={handleOpenModal} onClose={handleCloseModal}/>}
                {modals.register &&
                    <Modal modalId="register" onOpenModal={handleOpenModal} onClose={handleCloseModal}/>}
                {modals.settings && <Modal modalId="settings" onClose={handleCloseModal}/>}
                <ToastContainer theme="dark"/>
            </div>
        </Router>
    );
}

export default App;