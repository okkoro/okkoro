import {useRouter} from "next/router";
import {getMovieById} from "../../../lib/firebase";
import {useState} from "react";
import {Col, Container, Image, Row} from "react-bootstrap";

export default function MovieDetails() {
    const {movieId} = useRouter().query;

    const [movieDetails, setMovieDetails] = useState(null as any);
    const [movieGenres, setMovieGenres] = useState(null);

    if (typeof movieId === "string" && (movieDetails == null || movieDetails.id != movieId)) {
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
            <div className="col">
                {movieDetails != null && (
                    <Container>
                        <Row>
                            <Col>
                                <Image className={"w-75 p-3"} style={{borderRadius: 25}} src={"https://image.tmdb.org/t/p/w500" + movieDetails.poster_path} alt="image of movie" />
                            </Col>
                            <Col className={"col-lg-9 col-md-6"}>
                                <h1>{movieDetails.title}</h1>
                                <p>{movieDetails.release_date}</p>
                                <p>{movieDetails.vote_average}/10</p>
                                <p>{movieGenres}</p>
                                <p>{movieDetails.overview}</p>
                            </Col>
                        </Row>
                    </Container>
                )}
            </div>
        </div>
    )
}