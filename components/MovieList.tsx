import {Container} from "react-bootstrap";
import MovieTile from "./MovieTile";

type propsType = {
    listTitle: string;
    movies: [any];
}

export default function MovieList(props: propsType) {

    return (
        <Container fluid>
            <h2>{props.listTitle}</h2>
            <div className={"d-flex flex-row flex-nowrap overflow-auto"}>
                {/*TODO: replace with proper display logic*/}
                {props.movies &&
                    props.movies.map((movie) => (
                        <MovieTile movie={movie}/>
                    ))
                }
            </div>
        </Container>
    )
}