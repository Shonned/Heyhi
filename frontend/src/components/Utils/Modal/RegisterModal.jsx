import {useState} from "react";
import {ModalBody, ModalClose, ModalHeader, ModalSubmit} from "./Modal.styles.js";
import {RegisterForm} from "@components/Form/Form.jsx";

const RegisterModal = ({onClose, modalId}) => {

    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
    };

    return (
        <>
            <ModalHeader>
                <h2>
                    Register
                </h2>
                <ModalClose onClick={() => onClose(modalId)}>
                            <span className="icon material-symbols-rounded">
                                close
                            </span>
                </ModalClose>
            </ModalHeader>
            <ModalBody>
                <RegisterForm loading={loading} handleSubmit={handleSubmit}/>
            </ModalBody>
        </>
    );
};

export default RegisterModal;