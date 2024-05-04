import {useState} from "react";
import {LoginForm, RegisterForm, SettingsForm} from "@components/Form/Form.jsx";
import Button from "@components/Form/Button/Button.jsx";
import {
    StyledModal,
    AnimatedModalContainer,
} from './Modal.styles';
import LoginModal from "./LoginModal.jsx";
import RegisterModal from "./RegisterModal.jsx";
import SettingsModal from "./SettingsModal.jsx";


const Modal = ({onClose, modalId}) => {

    return (
        <StyledModal>
            <AnimatedModalContainer>
                {modalId === 'login' && <LoginModal modalId={modalId} onClose={onClose}/>}
                {modalId === 'register' && <RegisterModal modalId={modalId} onClose={onClose}/>}
                {modalId === 'settings' && <SettingsModal modalId={modalId} onClose={onClose}/>}
            </AnimatedModalContainer>
        </StyledModal>
    );
};

export default Modal;