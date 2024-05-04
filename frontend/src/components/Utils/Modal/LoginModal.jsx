import {useState} from "react";
import {ModalBody, ModalClose, ModalHeader, ModalSubmit} from "./Modal.styles.js";
import {LoginForm} from "@components/Form/Form.jsx";

const LoginModal = ({onClose, modalId}) => {

    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
    };

    return (
        <>
            <ModalHeader>
                <h2>
                    Login
                </h2>
                <ModalClose onClick={() => onClose(modalId)}>
                            <span className="icon material-symbols-rounded">
                                close
                            </span>
                </ModalClose>
            </ModalHeader>
            <ModalBody>
                <LoginForm loading={loading} handleSubmit={handleSubmit}/>
            </ModalBody>
        </>
    );
};

export default LoginModal;