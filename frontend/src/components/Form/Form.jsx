import Input from "./Input/Input.jsx";

const LoginForm = () => {
    return (
        <>
            <Input type="email" label="Adresse e-mail" name="email" id="email"/>
            <Input type="password" label="Mot de passe" name="password" id="password"/>
        </>
    );
};

const RegisterForm = () => {
    return (
        <>
            <Input type="text" label="Nom d'utilisateur" name="username" id="username" />
            <Input type="email" label="Adresse e-mail" name="email" id="email"/>
            <Input type="password" label="Mot de passe" name="password" id="password"/>
        </>
    );
};

const SettingsForm = () => {
    return (
        <>
            <Input type="text" label="Nouveau nom d'utilisateur" name="newUsername" id="newUsername"/>
            <Input type="email" label="Nouvelle adresse e-mail" name="newEmail" id="newEmail" />
            <Input type="password" label="Nouveau mot de passe" name="newPassword" id="newPassword"/>
        </>
    );
};

export { LoginForm, RegisterForm, SettingsForm };