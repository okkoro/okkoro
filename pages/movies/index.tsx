import MovieList from "../../components/MovieList";
import dummyMovies from "../../lib/dummydata/dummymovies";

export default function Index() {

    return (
        <div>
            {/*// @ts-ignore*/}
            <MovieList listTitle={"Dummy placeholder movies to be filled in"} movies={dummyMovies} />
        </div>
    )
}