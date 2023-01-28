import {useRouter} from "next/router";
import {getMovieById} from "../../../lib/firebase";
import {useContext, useState} from "react";
import {Button, Col, Container, Form, Image, Modal, Row} from "react-bootstrap";
import {ReviewLister} from "../../../components/ReviewLister";
import {UserContext} from "../../../lib/context";

import toast from "react-hot-toast";

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

                        Reviews:
                        <ReviewLister movieId={movieDetails.id} />

                    </Container>
                )}
            </div>
        </div>
    )
}

function AddReviewModal(props: { movie: Movie }) {
    const {user, username} = useContext(UserContext);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            movieId: props.movie.id,
            userId: username,
            score: event.target.score.value,
            text: event.target.text.value
        }

        const JSONdata = JSON.stringify(data);

        const endpoint = '/api/reviews'

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }

        const response = await fetch(endpoint, options);
        const result = await response.json();
        // alert(`Data: ${result.data}`);

        toast.success("Review created!");

        //Close modal
        handleClose();
    }
    return (
        <>
            <Button variant={"green"} className={"rounded-pill text-black"} onClick={handleShow}>
                Add review
            </Button>

            <div onClick={e => e.stopPropagation()}>
                <Modal size={"lg"} show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a new review for {props.movie.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form onSubmit={handleSubmit} id={"reviewForm"}>
                            <Form.Group controlId={"formScore"} >
                                <Form.Label>Score:</Form.Label>
                                <Form.Select required id={"score"} name={"score"}>
                                    <option value="1">1 - Disgusting</option>
                                    <option value="2">2 - Terrible</option>
                                    <option value="3">3 - Really bad</option>
                                    <option value="4">4 - Just Bad</option>
                                    <option value="5">5 - Average</option>
                                    <option value="6">6 - Passable</option>
                                    <option value="7">7 - Good</option>
                                    <option value="8">8 - Really Good</option>
                                    <option value="9">9 - Great</option>
                                    <option value="10">10 - Masterpiece</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group  controlId={"formText"}>
                                <Form.Label>Review Text:</Form.Label>
                                <Form.Control required id={"text"} name={"text"} as={"textarea"} rows={5} />
                            </Form.Group>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type={"submit"} form={"reviewForm"}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}