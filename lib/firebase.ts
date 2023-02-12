import firebaseConfig from "./firebaseConfig";
import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {DocumentSnapshot, getFirestore} from "firebase/firestore";
import {collection, doc, getDoc, getDocs, limit, orderBy, query, setDoc, where} from "@firebase/firestore";
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

export async function getMovieById(id: number) {
    const ref = collection(firestore, 'movies');
    const genreQuery = query(
        // @ts-ignore
        ref,
        where('id', "==", id),
        limit(1)
    )

    // @ts-ignore
    return docToJSON((await getDocs(genreQuery)).docs[0]);
}

export async function fetchMasterList(urlUsername: string) {
    console.log("DB READ! (fetchmasterlist)")
    const ref = collection(firestore, 'users');
    const userInfoQuery = query(
        // @ts-ignore
        ref,
        where('username', "==", urlUsername)
    )

    // @ts-ignore
    const userInfo = docToJSON((await getDocs(userInfoQuery)).docs[0]);



    return userInfo.listedMovies;
}


export async function fetchUserInfo(userId: string) {
    console.log("DB READ! (fetchuser)")
    return getDoc(doc(firestore, "users", userId))

}

export async function deleteMovieFromList(id: number, list: string, userId: string) {
    console.log("DB WRITE! (deleteMovieFromList)")
    fetchUserInfo(userId).then((res) => {
        var listedMovies: ListedMovie[] = res.get("listedMovies")

        listedMovies[listedMovies.findIndex(x => x.movieId == id)].lists = listedMovies[listedMovies.findIndex(x => x.movieId == id)].lists.filter(x => x !== list)
        listedMovies = listedMovies.filter((listedMovie)=>{
            if(!listedMovie.lists.length == 0){
                return {movieId: listedMovie.movieId, lists: listedMovie.lists}
            }
        })
        console.log(listedMovies)
        let data = {
            listedMovies: listedMovies
        }
        setDoc(doc(firestore, "users", userId), data, {merge: true})

    })

}

export async function fetchMovieDetailsForList(movieIds: [number]) {
    console.log("DB READ! (fetchDetailsForList)")
    const ref = collection(firestore, 'movies');
    const searchQuery = query(
        // @ts-ignore
        ref,
        where('id', "in", movieIds),
        orderBy("title")
    )

    // console.table(userInfo);
    // @ts-ignore
    return (await getDocs(searchQuery)).docs.map(docToJSON);
}

export async function fetchAllGenres() {
    console.log("DB READ! (fetchGenres)")
    const ref = collection(firestore, 'genres');
    const genreQuery = query(
        // @ts-ignore
        ref,
        orderBy("name"),
    )

    return (await getDocs(genreQuery)).docs.map(docToJSON);
}

export async function fetchGenres(userId: string) {
    const userInfo = await fetchUserInfo(userId)
    return await userInfo.get("genres")
}

export async function updateGenres(userId: string, genres: Genre[]) {
    console.log("DB WRITE! (updateGenres)")
    let data : Genre[] = []
    genres.forEach((genre)=> {
        if(genre.isChosen){
            data.push({id: genre.id, name: genre.name})
        }
    })
    console.log(data)

    await setDoc(doc(firestore, "users", userId), {"genres":data}, {merge: true})



}

export async function getReviewByMovieAndUsername(movieId: number, username: any) {
    const ref = collection(firestore, 'reviews');
    const activeUserReviewQuery = query(ref, where('movieId', '==', movieId), where('userId', '==', username));

    return await getDocs(activeUserReviewQuery);

}

export async function addMovieToList(id: string, user: any, list: string, userInfo: any) {
    const ref = doc(firestore, 'users', userInfo.uid);
    for (let i = 0; i < user.listedMovies.length; i++) {
        if (user.listedMovies.at(i).movieId == id) {
            if (user.listedMovies.at(i).lists.indexOf(list) > -1) {
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
    const ref = collection(firestore, 'users');
    const userInfoQuery = query(
        // @ts-ignore
        ref,
        where('username', "==", username)
    );

    // @ts-ignore
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [querySnapshot] = useCollection(userInfoQuery);

    return querySnapshot?.docs.map((doc) => doc.data());
}