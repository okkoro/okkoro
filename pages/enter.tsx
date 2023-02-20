import {auth, googleProvider} from "../lib/firebase";
import {signInWithPopup} from "firebase/auth";
import {UserContext} from "../lib/context";
import {useCallback, useContext, useEffect, useState} from "react";
import {doc, getDoc, getFirestore, writeBatch} from 'firebase/firestore';
// @ts-ignore
import debounce from 'lodash.debounce';
import Image from "next/image";
import {useTranslation} from "react-i18next";

// @ts-ignore
export default function Enter(props) {
    const {user, username} = useContext(UserContext);

    return (
        <main>
            <div className="row">
                <div className="col text-center">
                    {user ?
                        !username ? <UsernameForm /> : <SignOutButton />
                        : <SignInButton />
                    }
                </div>
            </div>
        </main>
    )
}

function SignInButton() {
    const {t} = useTranslation();
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <button className="btn-google" onClick={signInWithGoogle}>
            <Image height="32" width="32" src={"https://ssl.gstatic.com/images/branding/googleg/2x/googleg_standard_color_64dp.png"} alt={"google"} />
            {t("enterSignInWithGoogle")}
        </button>
    );
}

function SignOutButton() {
    const {t} = useTranslation();
    return <button onClick={() => auth.signOut()}>{t("enterSignOut")}</button>
}

function UsernameForm() {
    const {t} = useTranslation();
    const [formValue, setFormValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const {user, username} = useContext(UserContext);

    useEffect(() => {
        checkUsername(formValue);
    }, [formValue])

    // @ts-ignore
    const onChange = (e) => {
        const val = e.target.value.toLowerCase();
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

        if (val.length < 3) {
            setFormValue(val);
            setLoading(false);
            setIsValid(false);
        }

        if (re.test(val)) {
            setFormValue(val);
            setLoading(true);
            setIsValid(false);
        }
    }

    const checkUsername = useCallback(
        // @ts-ignore
        debounce(async (username) => {
            if (username.length >= 3) {
                const ref = doc(getFirestore(), `usernames`, username);
                const snap = await getDoc(ref);

                console.log('Firestore read executed: ', snap.exists());

                setIsValid(!snap.exists());
                setLoading(false);
            }
        }, 500),
        []
    );

    // @ts-ignore
    const onSubmit = async (e) => {
        e.preventDefault();

        // @ts-ignore
        const userDoc = doc(getFirestore(), 'users', user.uid);
        const usernameDoc = doc(getFirestore(), 'usernames', formValue);

        const batch = writeBatch(getFirestore());
        // @ts-ignore
        batch.set(userDoc, {username: formValue, photoURL: user.photoURL, displayName: user.displayName});
        // @ts-ignore
        batch.set(usernameDoc, {uid: user.uid})

        await batch.commit();
    }

    // @ts-ignore
    function UsernameMessage({username, isValid, loading}) {
        if (loading) {
            return <p>{t("enterCheckingMessage")}</p>
        } else if (isValid) {
            return <p className="text-success">{t("enterUsernameAvailable", {username: username})}</p>
        } else if (username && !isValid) {
            return <p className="text-danger">{t("enterUsernameNotAvailable")}</p>
        } else {
            return <p></p>
        }
    }

    return (
        !username && (
            <section>
                <h3>{t("enterChooseUsername")}</h3>
                <form onSubmit={onSubmit}>
                    <input name="username" placeholder="username " value={formValue} onChange={onChange} />

                    <UsernameMessage username={formValue} isValid={isValid} loading={loading} />

                    <button type="submit" className="btn-green" disabled={!isValid}>
                        {t("enterChooseBtn")}
                    </button>

                    {/*<h3>Debug State:</h3>*/}
                    {/*<div>*/}
                    {/*    Username: {formValue}*/}
                    {/*    <br />*/}
                    {/*    Loading: {loading.toString()}*/}
                    {/*    <br />*/}
                    {/*    Username Valid: {isValid.toString()}*/}
                    {/*</div>*/}
                </form>
            </section>
        )
    );
}