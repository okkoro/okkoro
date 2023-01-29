import {Container} from "react-bootstrap";
import MovieTile from "./MovieTile";
import {fetchMovieDetailsForList} from "../lib/firebase";
import {useEffect, useState} from "react";

type propsType = {
    listTitle: string;
    movies: [number];

    stateUpdate: ()=>void;
}



export default function ProfileMovieList(props: propsType) {
    const [finalMovies, setMovies] = useState([])

    useEffect(()=>{
            fetchMovieDetailsForList(props.movies)
                .then((res) => {
                    // @ts-ignore
                    setMovies(res)
                    console.log(finalMovies)
                })
    },[props.movies])




    // @ts-ignore
    // @ts-ignore
    return (
        <Container fluid data-cy={`${props.listTitle}-ProfileMovieList`}>
            <h2>{props.listTitle}</h2>
            <div className={"d-flex flex-row flex-nowrap overflow-auto"}>
                {props.movies &&
                    finalMovies.map((movie, index ) => (
                        //@ts-ignore
                        <MovieTile key={movie.id} movie={movie} list={props.listTitle} stateUpdate={props.stateUpdate}/>
                    ))
                }
            </div>
        </Container>
    )
}