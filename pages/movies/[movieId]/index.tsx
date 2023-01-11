import {useRouter} from "next/router";
import {getMovieById} from "../../../lib/firebase";
import {useState} from "react";
import movies from "../../../lib/dummydata/dummymovies";

export default function MovieDetails() {
    const {movieId} = useRouter().query;

    const [movieDetails, setMovieDetails] = useState(null as any);
    const [movieGenres, setMovieGenres] = useState(null);

    // console.log("before is string" + movieId);

    if (typeof movieId === "string") {
        console.log("is string");
        getMovieById(parseInt(movieId))
            .then((res) => {
                let newMovie = res as Movie;

                let {genre_ids, ...movieDetails} = newMovie;

                // @ts-ignore
                setMovieDetails(movieDetails);
                setMovieGenres(movieGenres)

            })
    }

    return (
        <div className="row bg-green">
            <div className="col text-center">
                {movieDetails != null && (
                    <h1>Movie: {movieDetails.title}</h1>

                )}
            </div>
        </div>
    )
}