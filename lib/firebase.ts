import firebaseConfig from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore, DocumentSnapshot, getDoc, doc} from "firebase/firestore";
import {collection, getDocs, limit, orderBy, setDoc, where} from "@firebase/firestore";
import {query} from "@firebase/database";

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


export async function fetchUserInfo(userId: string) {
    console.log("read")
    return getDoc(doc(firestore,"users", userId))

}
export async function deleteMovieFromList(id: number, list: string, userId: string) {

    fetchUserInfo(userId).then((res) => {
        var listedMovies: ListedMovie[] = res.get("listedMovies")

        listedMovies[listedMovies.findIndex(x => x.movieId == id)].lists = listedMovies[listedMovies.findIndex(x => x.movieId == id)].lists.filter(x => x !== list)
        let data = {
            listedMovies: listedMovies
        }
        setDoc(doc(firestore,"users", userId), data, { merge:true })

    })

}

export async function fetchMovieDetailsForList(movieIds: [number]) {
    const ref = collection(getFirestore(), 'movies');
    const searchQuery = query(
        // @ts-ignore
        ref,
        where('id', "in", movieIds),
        orderBy("title")
    )



    // console.table(userInfo);
    console.log("read")
    // @ts-ignore
    return (await getDocs(searchQuery)).docs.map(docToJSON);
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