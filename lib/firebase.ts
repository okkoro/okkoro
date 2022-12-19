import firebaseConfig from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, DocumentSnapshot } from "firebase/firestore";

// Initialize firebase
const firebaseApp = initializeApp(firebaseConfig);

// Firestore exports
export const firestore = getFirestore(firebaseApp);

//Auth Exports
export const auth = getAuth(firebaseApp);
export const googleProvider = new GoogleAuthProvider();

export default firebaseApp;


/**
 * Converts a firestore document to JSON
 * @param {DocumentSnapshot} doc
 */
export function docToJSON(doc: DocumentSnapshot) {
    const data = doc.data();
    return {
        ...data
    }
}