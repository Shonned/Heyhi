import {ModalBody, ModalClose, ModalHeader} from "./Modal.styles.js";
import {LoginForm} from "@components/Form/Form.jsx";

const LoginModal = ({onClose, modalId}) => {

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
                <LoginForm />
            </ModalBody>
        </>
    );
};

export default LoginModal;