import {collection, getDocs, limit, orderBy, where} from "@firebase/firestore";
import {getFirestore} from "firebase/firestore";
import {query} from "@firebase/database";
import {useState} from "react";
import {docToJSON} from "../lib/firebase";

const LIMIT = 10;

export async function getServerSideProps() {
    // TODO: Modify this query to suit our needs, currently only fetches comedy movies
    const ref = collection(getFirestore(), 'movies');
    const genreQuery = query(
        // @ts-ignore
        ref,
        where('genre_ids', "array-contains", 35),
        orderBy("id"),
        limit(LIMIT)
    )

    // @ts-ignore
    const movies = (await getDocs(genreQuery)).docs.map(docToJSON);

    return {
        props: {movies}
    }

}

export default function Home(props: { movies: [any]; }) {
    const [movies, setMovies] = useState(props.movies)

    return (
        <div className="row bg-green">
            <div className="col text-center">
                <img src="okkoro.png" />
                <h1>WELCOME TO OKKORO</h1>
            </div>
        </div>
    )
}
