import Input from "./Input/Input.jsx";

const LoginForm = () => {
    return (
        <>
            <Input type="text" placeholder="Nom d'utilisateur" name="username"/>
            <Input type="password" placeholder="Mot de passe" name="password"/>
        </>
    );
};

const RegisterForm = () => {
    return (
        <>
            <Input type="text" placeholder="Nom d'utilisateur" name="username"/>
            <Input type="email" placeholder="Adresse e-mail" name="email"/>
            <Input type="password" placeholder="Mot de passe" name="password"/>
        </>
    );
};

const SettingsForm = () => {
    return (
        <>
            <Input type="text" placeholder="Nouveau nom d'utilisateur" name="newUsername"/>
            <Input type="email" placeholder="Nouvelle adresse e-mail" name="newEmail"/>
            <Input type="password" placeholder="Nouveau mot de passe" name="newPassword"/>
        </>
    );
};

export { LoginForm, RegisterForm, SettingsForm };