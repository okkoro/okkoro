import {useRouter} from "next/router";
import {getMovieById} from "../../../lib/firebase";
import {useState} from "react";
import {Button, Col, Container, Image, Modal, Row} from "react-bootstrap";
import {ReviewLister} from "../../../components/ReviewLister";

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
        <div className="row">
            <div className="col">
                {movieDetails != null && (
                    <Container>
                        <Row>
                            <Col className={"text-center"}>
                                <Image className={"w-75 p-3"} style={{borderRadius: 25}} src={"https://image.tmdb.org/t/p/w500" + movieDetails.poster_path} alt="image of movie" />

                                <AddReviewModal movie={movieDetails} />
                            </Col>
                            <Col className={"col-lg-9 col-md-6"}>
                                <h1 data-cy={`MovieTitle`}>{movieDetails.title}</h1>
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

function AddReviewModal(props: { movie: Movie }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant={"green"} className={"rounded-pill text-black"} onClick={handleShow}>
                Add review
            </Button>

            <Modal size={"lg"} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a new review for {props.movie.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Form go here
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}