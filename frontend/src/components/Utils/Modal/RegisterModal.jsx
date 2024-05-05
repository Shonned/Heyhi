import {useState} from "react";
import {ModalBody, ModalClose, ModalHeader, ModalSubmit} from "./Modal.styles.js";
import {RegisterForm} from "@components/Form/Form.jsx";

const RegisterModal = ({onClose, modalId}) => {
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
                <RegisterForm/>
            </ModalBody>
        </>
    );
};

export default RegisterModal;