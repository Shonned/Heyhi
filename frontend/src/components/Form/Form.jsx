import {useState} from "react";
import Input from "@components/Form/Input/Input.jsx";
import {ModalSubmit} from "@components/Utils/Modal/Modal.styles.js";
import Button from "@components/Form/Button/Button.jsx";
import axios from "axios";
import {createUserWithEmailAndPassword} from "firebase/auth"
import {auth, db} from "./Firebase.jsx";
import {setDoc, doc} from "firebase/firestore";
import {toast} from "react-toastify";

const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const request = await axios.post('http://localhost:5000/api/users/login', {email, password});
            console.log(request.data)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <form>
                <Input type="email" placeholder={""} label="Email address" name="email" id="email" value={email}
                       onChange={e => setEmail(e.target.value)}/>
                <Input type="password" placeholder={""} label="Password" name="password" id="password" value={password}
                       onChange={e => setPassword(e.target.value)}/>
                <ModalSubmit>
                    <Button className={"button"}
                            type="submit"
                            text={"Login"}
                            loading={loading}
                            onClick={handleSubmit}
                            style={{width: '100%'}}/>
                </ModalSubmit>
            </form>
        </>
    );
};

const RegisterForm = () => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            console.log(user);
            if(user) {
                const createdAt = new Date();
                await setDoc(doc(db, "users", user.uid), {
                    email: user.email,
                    username: username,
                    created_at: createdAt,
                    updated_at: createdAt,
                });
            }
            console.log("Ok");
            toast.success("User successfully registered!", {
                position: "top-right"
            });
        } catch (e) {
            toast.error(e.message, {
                position: "top-right",
            });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Input type="text" placeholder={""} label="Username" name="username" id="username" value={username}
                       onChange={e => setUsername(e.target.value)}/>
                <Input type="email" placeholder={""} label="Email address" name="email" id="email" value={email}
                       onChange={e => setEmail(e.target.value)}/>
                <Input type="password" placeholder={""} label="Password" name="password" id="password" value={password}
                       onChange={e => setPassword(e.target.value)}/>
                <ModalSubmit>
                    <Button className={"button"}
                            type="submit"
                            text={"Register"}
                            loading={loading}
                            onClick={handleSubmit}
                            style={{width: '100%'}}/>
                </ModalSubmit>
            </form>
        </>
    );
};

const SettingsForm = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Input type="text" placeholder={""} label="New Username" name="newUsername" id="newUsername"/>
                <Input type="email" placeholder={""} label="New Email address" name="newEmail" id="newEmail"/>
                <Input type="password" placeholder={""} label="New Password" name="newPassword" id="newPassword"/>
                <ModalSubmit>
                    <Button className={"button"}
                            text={"Update"}
                            loading={loading}
                            onClick={handleSubmit}
                            style={{width: '100%'}}/>
                </ModalSubmit>
            </form>
        </>
    );
};

export {LoginForm, RegisterForm, SettingsForm};