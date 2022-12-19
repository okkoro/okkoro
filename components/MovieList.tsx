import {Container} from "react-bootstrap";

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
                        <div key={movie.id} className="card card-block mx-2" style={{minWidth: "300px"}}>
                            &nbsp; {movie.title} &nbsp;
                        </div>
                    ))
                }
            </div>
        </Container>
    )
}