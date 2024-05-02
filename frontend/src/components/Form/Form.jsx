import Input from "./Input/Input.jsx";

const LoginForm = () => {
    return (
        <>
            <Input type="email" label="Email address" name="email" id="email"/>
            <Input type="password" label="Password" name="password" id="password"/>
        </>
    );
};

const RegisterForm = () => {
    return (
        <>
            <Input type="text" label="Username" name="username" id="username" />
            <Input type="email" label="Email address" name="email" id="email"/>
            <Input type="password" label="Password" name="password" id="password"/>
        </>
    );
};

const SettingsForm = () => {
    return (
        <>
            <Input type="text" label="New Username" name="newUsername" id="newUsername"/>
            <Input type="email" label="New Email address" name="newEmail" id="newEmail" />
            <Input type="password" label="New Password" name="newPassword" id="newPassword"/>
        </>
    );
};

export { LoginForm, RegisterForm, SettingsForm };