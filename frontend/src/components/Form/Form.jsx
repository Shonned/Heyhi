import {useEffect, useState} from "react";
import Input from "@components/Form/Input/Input.jsx";
import {ModalSubmit} from "@components/Utils/Modal/Modal.styles.js";
import Button from "@components/Form/Button/Button.jsx";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import {auth, db} from "./Firebase.jsx";
import {setDoc, doc, getDoc} from "firebase/firestore";
import {toast} from "react-toastify";

const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Sign in successfully.", {
                position: "top-right",
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
            if (user) {
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
    const [userDetails, setUserDetails] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const fetchUserData = async () => {
        auth.onAuthStateChanged(async (user) => {
            console.log(user);
            const docRef = doc(db, "Users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserDetails(docSnap.data());
                console.log(docSnap.data());
            } else {
                console.log("User not connected");
            }
        });
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
    }

    return (
        <>
            {userDetails && (
                <form onSubmit={handleSubmit}>
                    <Input type="text" placeholder={""} label="Username" name="newUsername" id="newUsername"
                           value={username}
                           onChange={e => setUsername(e.target.value)}/>
                    <Input type="email" placeholder={""} label="Email address" name="newEmail" id="newEmail"
                           value={email}
                           onChange={e => setEmail(e.target.value)}/>
                    <ModalSubmit>
                        <Button className={"button"}
                                text={"Update"}
                                loading={loading}
                                onClick={handleSubmit}
                                style={{width: '100%'}}/>
                    </ModalSubmit>
                </form>
            )}
        </>
    );
};

export {LoginForm, RegisterForm, SettingsForm};