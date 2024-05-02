import './Modal.css'
import '../../Form/Form.css'
import {useState} from "react";
import {LoginForm, RegisterForm, SettingsForm} from "../../Form/Form.jsx";
import Button from "../../Form/Button/Button.jsx";

const Modal = ({onClose, modalId}) => {

    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
    };

    return (
        <div className="modal">
            <div className="modal-container animate__animated animate__fadeInUp">
                <div className="modal-header">
                    <h3 className="modal-title">
                        {modalId === 'login' ? 'Connexion' : modalId === 'register' ? 'Inscription' : 'Paramètres'}
                    </h3>
                    <div className="modal-close" onClick={() => onClose(modalId)}>
                        <span className="icon material-symbols-rounded">
                            close
                        </span>
                    </div>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        {modalId === 'login' && <LoginForm/>}
                        {modalId === 'register' && <RegisterForm/>}
                        {modalId === 'settings' && <SettingsForm/>}
                        <div className="modal-submit">
                            <Button type="submit" text={modalId === 'login' ? 'Se connecter' : modalId === 'register' ? "S'inscrire" : 'Mettre à jour'} loading={loading} onClick={handleSubmit}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modal;