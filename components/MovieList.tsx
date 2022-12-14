import {Container} from "react-bootstrap";

import MovieTile from "./MovieTile";

type propsType = {
    listTitle: string;
    movies: [any];
}

export default function MovieList(props: propsType) {

    return (
        <Container fluid data-cy={`${props.listTitle}-MovieList`}>
            <h2>{props.listTitle}</h2>
            <div className={"d-flex flex-row flex-nowrap overflow-auto"}>
                {/*TODO: replace with proper display logic*/}
                {props.movies &&
                    props.movies.map((movie) => (
                        <MovieTile key={movie.id} movie={movie}/>
                    ))
                }
            </div>
        </Container>
    )
}