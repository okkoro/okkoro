import {collection, getDocs, limit, orderBy, where} from "@firebase/firestore";
import {getFirestore} from "firebase/firestore";
import {query} from "@firebase/database";
import {useState} from "react";
import {docToJSON} from "../lib/firebase";
import Image from "next/image";

import okkoroPic from "/public/okkoro.png";
import MovieList from "../components/MovieList";
import {useTranslation} from "react-i18next";

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

export default function Home(props: { movies: [Movie]; }) {
    const [movies, setMovies] = useState(props.movies);

    const {t} = useTranslation();

    return (
        <div>
            <div className="row">
                <div className="col text-center">
                    <Image src={okkoroPic} alt={"Logo"} />

                    <h1>{t("landingWelcome")}</h1>

                </div>
            </div>
            <MovieList movies={movies} listTitle={t("landingGenre")} />
        </div>
    )
}