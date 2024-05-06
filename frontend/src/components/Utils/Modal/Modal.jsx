import {
    StyledModal,
    AnimatedModalContainer,
} from './Modal.styles';
import LoginModal from "./LoginModal.jsx";
import RegisterModal from "./RegisterModal.jsx";
import SettingsModal from "./SettingsModal.jsx";


const Modal = (props) => {

    return (
        <StyledModal>
            <AnimatedModalContainer>
                {props.modalId === 'login' && <LoginModal modalId={props.modalId} onOpenModal={props.onOpenModal} onClose={props.onClose}/>}
                {props.modalId === 'register' && <RegisterModal modalId={props.modalId} onOpenModal={props.onOpenModal} onClose={props.onClose}/>}
                {props.modalId === 'settings' && <SettingsModal modalId={props.modalId} onClose={props.onClose}/>}
            </AnimatedModalContainer>
        </StyledModal>
    );
};

export default Modal;