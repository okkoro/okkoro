import firebaseConfig from "./firebaseConfig";
import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {DocumentSnapshot, getFirestore} from "firebase/firestore";
import {collection, getDocs, limit, query, where} from "@firebase/firestore";

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

export async function getMovieById(id: number) {
    const ref = collection(getFirestore(), 'movies');
    const genreQuery = query(
        // @ts-ignore
        ref,
        where('id', "==", id),
        limit(1)
    )

    // @ts-ignore
    return docToJSON((await getDocs(genreQuery)).docs[0]);
}

export async function getReviewByMovieAndUsername(movieId: number, username: any) {
    const ref = collection(getFirestore(), 'reviews');
    const activeUserReviewQuery = query(ref, where('movieId', '==', movieId), where('userId', '==', username));

    return await getDocs(activeUserReviewQuery);

}