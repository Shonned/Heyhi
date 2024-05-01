import './Modal.css'
import {useState} from "react";
import Button from "../../Form/Button/Button.jsx";

const Modal = ({onClose, modalId}) => {

    const [loading, setLoading] = useState(false);

    const action = () => {
        setLoading(true);
    }

    return (
        <div className="modal">
            <div className="modal-container animate__animated animate__fadeInUp">
                <div className="modal-header">
                    <h3 className="modal-title">
                        Modal Title
                    </h3>
                    <div className="modal-close" onClick={() => onClose(modalId)}>
                        <span className="icon material-symbols-rounded">
                            close
                        </span>
                    </div>
                </div>
                <div className="modal-body">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab architecto delectus distinctio enim, fuga impedit, iste obcaecati quis recusandae reiciendis ullam unde, vel voluptas? Architecto ea odio voluptas? Laudantium, vel?
                </div>
                <div className="modal-submit">
                    <Button type="submit" text="Valider" loading={loading} onClick={action} />
                </div>
            </div>
        </div>
    );
};

export default Modal;
