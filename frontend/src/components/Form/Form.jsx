import {useState} from "react";
import Input from "@components/Form/Input/Input.jsx";
import {ModalSubmit} from "@components/Utils/Modal/Modal.styles.js";
import Button from "@components/Form/Button/Button.jsx";
import axios from "axios";

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
                <Input type="email" label="Email address" name="email" id="email" value={email}
                       onChange={e => setEmail(e.target.value)}/>
                <Input type="password" label="Password" name="password" id="password" value={password}
                       onChange={e => setPassword(e.target.value)}/>
                <ModalSubmit>
                    <Button type="submit"
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
            const request = await axios.post('http://localhost:5000/api/users/register', {username, email, password});
            console.log(request.data)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Input type="text" label="Username" name="username" id="username" value={username}
                       onChange={e => setUsername(e.target.value)}/>
                <Input type="email" label="Email address" name="email" id="email" value={email}
                       onChange={e => setEmail(e.target.value)}/>
                <Input type="password" label="Password" name="password" id="password" value={password}
                       onChange={e => setPassword(e.target.value)}/>
                <ModalSubmit>
                    <Button type="submit"
                            text={"Register"}
                            loading={loading}
                            onClick={handleSubmit}
                            style={{width: '100%'}}/>
                </ModalSubmit>
            </form>
        </>
    );
};

const SettingsForm = ({handleSubmit, loading}) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Input type="text" label="New Username" name="newUsername" id="newUsername"/>
                <Input type="email" label="New Email address" name="newEmail" id="newEmail"/>
                <Input type="password" label="New Password" name="newPassword" id="newPassword"/>
                <ModalSubmit>
                    <Button type="submit"
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