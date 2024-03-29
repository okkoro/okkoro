import firebaseConfig from "./firebaseConfig";
import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {DocumentSnapshot, getFirestore} from "firebase/firestore";
import {addDoc, collection, doc, getDoc, getDocs, limit, orderBy, query, serverTimestamp, setDoc, where} from "@firebase/firestore";
import {useCollection} from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";

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

        listedMovies[listedMovies.findIndex(x => x.movieId == id)].lists = listedMovies[listedMovies.findIndex(x => x.movieId == id)].lists.filter(x => x != list)
        listedMovies = listedMovies.filter(listedMovie=>!(listedMovie.lists.length == 0))
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
                return false;
            }

            user.listedMovies.at(i).lists.push(list);

            await setDoc(ref, user);
            return true;
        }
    }

    user.listedMovies.push({"lists": [list], "movieId": +id});

    await setDoc(ref, user);

    return true;
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

export async function didUserReport(reviewId: string, reporter:string) {
    const ref = collection(firestore, 'reports');
    const reportQuery = query(ref, where('reviewId', '==', reviewId), where('reporter', '==', reporter));

    const report = await getDocs(reportQuery)
    return report.size>0
}

export async function submitReport(review: Review, reason: string, reporter:string) {
        const id = await getReviewByMovieAndUsername(review.movieId as number, review.userId).then((doc) => doc.docs[0].id)
        if(await didUserReport(id,reporter)){
            return toast.error("You Already Reported This Review");
        }
        const data = {
            date: serverTimestamp(),
            reason: reason,
            removed: false,
            reviewId: id,
            reviewed: false,
            text: review.text,
            userId: review.userId,
            reporter: reporter
        }
        addDoc(collection(firestore, 'reports'), data)
            .catch((e) => {
                alert("failed to submit report: ");
                throw e;
            });
        toast.success("Report Submitted For Review");
}