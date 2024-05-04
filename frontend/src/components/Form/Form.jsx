import Input from "@components/Form/Input/Input.jsx";
import {ModalSubmit} from "@components/Utils/Modal/Modal.styles.js";
import Button from "@components/Form/Button/Button.jsx";

const LoginForm = ({loading, handleSubmit}) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Input type="email" label="Email address" name="email" id="email"/>
                <Input type="password" label="Password" name="password" id="password"/>
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

const RegisterForm = ({handleSubmit, loading}) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Input type="text" label="Username" name="username" id="username"/>
                <Input type="email" label="Email address" name="email" id="email"/>
                <Input type="password" label="Password" name="password" id="password"/>
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