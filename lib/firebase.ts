import firebaseConfig from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore, DocumentSnapshot, doc, setDoc} from "firebase/firestore";
import {collection, getDocs, limit, where} from "@firebase/firestore";
import {query} from "@firebase/database";
import {useCollection} from "react-firebase-hooks/firestore";

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

export async function getMovieById(id : number) {
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

export async function addMovieToList(id: string, user: any, list: string, userInfo: any){
    const ref = doc(getFirestore(), 'users', userInfo.uid);
    for(let i = 0; i < user.listedMovies.length; i++){
        if(user.listedMovies.at(i).movieId == id){
            if (user.listedMovies.at(i).lists.indexOf(list) > -1){
                return;
            }

            user.listedMovies.at(i).lists.push(list);
            // @ts-ignore
            await setDoc(ref, user);
            // @ts-ignore
            return;
        }
    }

    user.listedMovies.push({"lists": [list], "movieId": +id});
    // @ts-ignore
    await setDoc(ref, user);
    // @ts-ignore
    return;
}

export function getUserByUsername(username: any) {
    const ref = collection(getFirestore(), 'users');
    const userInfoQuery = query(
        // @ts-ignore
        ref,
        where('username', "==", username)
    );

    // @ts-ignore
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [querySnapshot] = useCollection(userInfoQuery);

    const userInfo = querySnapshot?.docs.map((doc) => doc.data());
    return userInfo
}