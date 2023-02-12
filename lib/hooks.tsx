import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { doc, onSnapshot, getFirestore } from 'firebase/firestore';

export function useUserData() {
    const [user] = useAuthState(auth);
    const [username, setUsername] = useState(null);
    const [admin, setAdmin] = useState(false)

    useEffect(() => {
        let unsubscribe;

        if (user) {
            const ref = doc(getFirestore(), 'users', user.uid);
            unsubscribe = onSnapshot(ref, (doc) => {
                setUsername(doc.data()?.username)
                setAdmin(doc.data()?.admin)
            });
        } else {
            setUsername(null);
        }

        return unsubscribe;
    }, [user]);

    return { user, username, admin }
}