import {useState} from "react";
import {ModalBody, ModalClose, ModalHeader, ModalHeaderContent} from "./Modal.styles.js";
import {SettingsForm} from "@components/Form/Form.jsx";

const SettingsModal = (props) => {

    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
    };

    return (
        <>
            <ModalHeader>
                <ModalHeaderContent>
                    <h2>
                        Settings
                    </h2>
                    <ModalClose onClick={() => props.onClose(props.modalId)}>
                            <span className="icon material-symbols-rounded">
                                close
                            </span>
                    </ModalClose>
                </ModalHeaderContent>
            </ModalHeader>
            <ModalBody>
                <SettingsForm loading={loading} handleSubmit={handleSubmit}/>
            </ModalBody>
        </>
    );
};

export default SettingsModal;