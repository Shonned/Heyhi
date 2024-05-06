import {ModalAuthSwitch, ModalBody, ModalClose, ModalHeader, ModalHeaderContent} from "./Modal.styles.js";
import {RegisterForm} from "@components/Form/Form.jsx";

const RegisterModal = (props) => {
    return (
        <>
            <ModalHeader>
                <ModalHeaderContent>
                    <h2>
                        Register
                    </h2>
                    <ModalClose onClick={() => props.onClose(props.modalId)}>
                                <span className="icon material-symbols-rounded">
                                    close
                                </span>
                    </ModalClose>
                </ModalHeaderContent>
                <ModalAuthSwitch>
                    Already have an account? <span onClick={() => props.onOpenModal('login')}>Log in</span>
                </ModalAuthSwitch>
            </ModalHeader>
            <ModalBody className={"auth-modal"}>
                <RegisterForm/>
            </ModalBody>
        </>
    );
};

export default RegisterModal;