import {ModalAuthSwitch, ModalBody, ModalClose, ModalHeader, ModalHeaderContent} from "./Modal.styles.js";
import {LoginForm} from "@components/Form/Form.jsx";

const LoginModal = (props) => {

    return (
        <>
            <ModalHeader>
                <ModalHeaderContent>
                    <h2>
                        Login
                    </h2>
                    <ModalClose onClick={() => props.onClose(props.modalId)}>
                                <span className="icon material-symbols-rounded">
                                    close
                                </span>
                    </ModalClose>
                </ModalHeaderContent>
                <ModalAuthSwitch>
                    Don't have an account? <span onClick={() => props.onOpenModal('register')}>Sign up now</span>
                </ModalAuthSwitch>
            </ModalHeader>
            <ModalBody className={"auth-modal"}>
                <LoginForm/>
            </ModalBody>
        </>
    );
};

export default LoginModal;