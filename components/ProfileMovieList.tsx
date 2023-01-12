import {Container} from "react-bootstrap";

import MovieTile from "./MovieTile";
import {collection, getDocs, orderBy, where} from "@firebase/firestore";
import {getFirestore} from "firebase/firestore";
import {query} from "@firebase/database";
import {docToJSON} from "../lib/firebase";
import {useState} from "react";

type propsType = {
    listTitle: string;
    movies: [number];
}

async function fetchMovieDetailsForList(movieIds: [number]) {
    console.log("DBCALLED!")
    const ref = collection(getFirestore(), 'movies');
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

export default function ProfileMovieList(props: propsType) {
    const [finalMovies, setMovies] = useState([])


    if(finalMovies.length<1) {
        fetchMovieDetailsForList(props.movies)
            .then((res) => {
                // @ts-ignore
                setMovies(res)
            })
    }



    // @ts-ignore
    // @ts-ignore
    return (
        <Container fluid data-cy={`${props.listTitle}-MovieList`}>
            <h2>{props.listTitle}</h2>
            <div className={"d-flex flex-row flex-nowrap overflow-auto"}>
                {/*TODO: replace with proper display logic*/}
                {props.movies &&
                    finalMovies.map((movie ) => (
                        //@ts-ignore
                        <MovieTile key={movie.id} movie={movie}/>
                    ))
                }
            </div>
        </Container>
    )
}