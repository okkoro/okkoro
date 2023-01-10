import {getFirestore} from "firebase/firestore";
import {collection, getDocs, limit, orderBy, where} from "@firebase/firestore";
import {query} from "@firebase/database";
import {docToJSON} from "../lib/firebase";
import {useState} from "react";
import MovieList from "../components/MovieList";


const LIMIT = 20;

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

export default function Movies(props: { movies: [any]; }) {

    const [movies, setMovies] = useState(props.movies)

    return (
        <div className="row bg-green">
            <div className="col text-center">


                <h1>Movies</h1>
                <MovieList movies={movies} listTitle={"Comedies"}/>
            </div>
        </div>
    )
}