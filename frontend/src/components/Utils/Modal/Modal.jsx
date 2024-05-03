import {useState} from "react";
import {LoginForm, RegisterForm, SettingsForm} from "@components/Form/Form.jsx";
import Button from "@components/Form/Button/Button.jsx";
import {
    StyledModal,
    AnimatedModalContainer,
    ModalHeader,
    ModalClose,
    ModalBody,
    ModalSubmit,
} from './Modal.styles';


const Modal = ({onClose, modalId}) => {

    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
    };

    return (
        <StyledModal>
            <AnimatedModalContainer>
                <ModalHeader>
                    <h2>
                        {modalId === 'login' ? 'Login' : modalId === 'register' ? 'Register' : 'Settings'}
                    </h2>
                    <ModalClose onClick={() => onClose(modalId)}>
                        <span className="icon material-symbols-rounded">
                            close
                        </span>
                    </ModalClose>
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        {modalId === 'login' && <LoginForm/>}
                        {modalId === 'register' && <RegisterForm/>}
                        {modalId === 'settings' && <SettingsForm/>}
                        <ModalSubmit>
                            <Button type="submit"
                                    text={modalId === 'login' ? 'Login' : modalId === 'register' ? "Register" : 'Update'}
                                    loading={loading}
                                    onClick={handleSubmit}
                                    style={{ width: '100%' }} />
                        </ModalSubmit>
                    </form>
                </ModalBody>
            </AnimatedModalContainer>
        </StyledModal>
    );
};

export default Modal;