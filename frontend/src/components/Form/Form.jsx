import {useEffect, useState} from "react";
import Input from "@components/Form/Input/Input.jsx";
import {ModalSubmit} from "@components/Utils/Modal/Modal.styles.js";
import Button from "@components/Form/Button/Button.jsx";
import {GoogleAuthProvider, FacebookAuthProvider, signInWithPopup} from "firebase/auth";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import {auth, db} from "./Firebase.jsx";
import {setDoc, doc, getDoc} from "firebase/firestore";
import {toast} from "react-toastify";
import {AuthChoice, ExternAuthServiceBtn, Form} from "./Form.styles.js";
import {FcGoogle} from "react-icons/fc";
import {FaFacebook} from "react-icons/fa";
import axios from "axios";

const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const uid = user.uid;

        const userDocRef = doc(db, "users", uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
            const createdAt = new Date();
            await setDoc(userDocRef, {
                uid: uid,
                email: user.email,
                username: user.displayName,
                created_at: createdAt,
                updated_at: createdAt,
            });
            console.log("New user document added for UID:", uid);
        } else {
            console.log("User document already exists for UID:", uid);
        }

        window.location.href = "/";
        toast.success("Sign in successfully.", {
            position: "top-right",
        });
    } catch (error) {
        console.log(error);
    }
};

const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
            const createdAt = new Date();
            await setDoc(userDocRef, {
                email: user.email,
                username: user.displayName,
                created_at: createdAt,
                updated_at: createdAt,
            });
        }

        window.location.href = "/";
        toast.success("Sign in successfully.", {
            position: "top-right",
        });
    } catch (error) {
        console.log(error);
    }
};

const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = "/";
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
            <Form onSubmit={handleSubmit}>
                <Input type="email" placeholder={""} label="Email address" name="email" id="email" value={email}
                       onChange={e => setEmail(e.target.value)}/>
                <Input type="password" placeholder={""} label="Password" name="password" id="password" value={password}
                       onChange={e => setPassword(e.target.value)}/>
                <AuthChoice>
                    <div className="separator">
                        <span>OR</span>
                    </div>
                    <ExternAuthServiceBtn className={"button google"}
                                          serviceIcon={<FcGoogle/>}
                                          text={"Login with Google"}
                                          onClick={handleGoogleSignIn}
                                          style={{width: '100%'}}/>
                    <ExternAuthServiceBtn
                        className={"button facebook"}
                        serviceIcon={<FaFacebook/>}
                        text={"Login with Facebook"}
                        onClick={handleFacebookSignIn}
                        style={{width: '100%'}}
                    />
                </AuthChoice>
                <ModalSubmit>
                    <Button className={"button"}
                            type="submit"
                            text={"Login"}
                            loading={loading}
                            onClick={handleSubmit}
                            style={{width: '100%'}}/>
                </ModalSubmit>
            </Form>
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
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            if (user) {
                const createdAt = new Date();
                await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    email: user.email,
                    username: username,
                    created_at: createdAt,
                    updated_at: createdAt,
                });
            }
            window.location.href = "/";
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
            <Form onSubmit={handleSubmit}>
                <Input type="text" placeholder={""} label="Username" name="username" id="username" value={username}
                       onChange={e => setUsername(e.target.value)}/>
                <Input type="email" placeholder={""} label="Email address" name="email" id="email" value={email}
                       onChange={e => setEmail(e.target.value)}/>
                <Input type="password" placeholder={""} label="Password" name="password" id="password" value={password}
                       onChange={e => setPassword(e.target.value)}/>
                <AuthChoice>
                    <div className="separator">
                        <span>OR</span>
                    </div>
                    <ExternAuthServiceBtn className={"button google"}
                                          serviceIcon={<FcGoogle/>}
                                          text={"Register with Google"}
                                          onClick={handleGoogleSignIn}
                                          style={{width: '100%'}}/>
                    <ExternAuthServiceBtn
                        className={"button facebook"}
                        serviceIcon={<FaFacebook/>}
                        text={"Login with Facebook"}
                        onClick={handleFacebookSignIn}
                        style={{width: '100%'}}
                    />
                </AuthChoice>
                <ModalSubmit>
                    <Button className={"button"}
                            type="submit"
                            text={"Register"}
                            loading={loading}
                            onClick={handleSubmit}
                            style={{width: '100%'}}/>
                </ModalSubmit>
            </Form>
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
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setUserDetails(userData);
                    setUsername(userData.username);
                    setEmail(userData.email);
                    console.log("User details:", userData);
                } else {
                    console.log("No such document for user with UID:", user.uid);
                }
            } else {
                console.log("User not connected");
            }
        });
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = {
            uid: userDetails.uid,
            username: username,
            email: email
        }
        try {
            const response = await axios.put('http://localhost:8000/api/user/update', formData);
            toast.success("User successfully updated!", {
                position: "top-right"
            });
        } catch (error) {
            toast.error(error.message, {
                position: "top-right",
            });
        }
        setLoading(false);
    }

    const handleSignOut = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            await auth.signOut();
            window.location.href = "/";
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <>
            {userDetails && (
                <Form onSubmit={handleSubmit}>
                    <Input type="text" placeholder={""} label="Username" name="newUsername" id="newUsername"
                           value={username}
                           onChange={e => setUsername(e.target.value)}/>
                    <Input type="email" placeholder={""} label="Email address" name="newEmail" id="newEmail"
                           value={email}
                           onChange={e => setEmail(e.target.value)}/>
                    <ModalSubmit>
                        <Button className={"button danger"}
                                text={"Logout"}
                                loading={loading}
                                onClick={handleSignOut}
                                style={{width: '100%'}}/>
                        <Button className={"button"}
                                text={"Update"}
                                loading={loading}
                                onClick={handleSubmit}
                                style={{width: '100%'}}/>
                    </ModalSubmit>
                </Form>
            )}
        </>
    );
};

export {LoginForm, RegisterForm, SettingsForm};