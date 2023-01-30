import {useRouter} from "next/router";
import {getMovieById, getReviewByMovieAndUsername} from "../../../lib/firebase";
import {useContext, useState} from "react";
import {Button, Col, Container, Form, Image, Modal, Row} from "react-bootstrap";
import {ReviewLister} from "../../../components/ReviewLister";
import {UserContext} from "../../../lib/context";

import toast from "react-hot-toast";
import {QueryDocumentSnapshot} from "@firebase/firestore";
import Link from "next/link";

export default function MovieDetails() {
    const {username} = useContext(UserContext);
    const {movieId} = useRouter().query;

    const [movieDetails, setMovieDetails] = useState(null as any);
    const [movieGenres, setMovieGenres] = useState(null);

    const [activeUserReview, setActiveUserReview] = useState(null);
    
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

    const getActiveUserReview = () => {
        if (typeof movieId === "string") {
            getReviewByMovieAndUsername(parseInt(movieId), username)
                .then((res) => {
                    if (!res.empty) { // @ts-ignore
                        setActiveUserReview(res.docs[0]);
                    }
                })
        }
    }

    if (username && activeUserReview == null) {
        getActiveUserReview();
    }

    // console.log(`Moviedetails refreshed: moviedetails + ${movieDetails} + Genres: ${movieGenres} + activeUserReview ${activeUserReview}`)

    return (
        <div className="row">
            <div className="col">
                {movieDetails != null && (
                    <Container>
                        <Row>
                            <Col className={"text-center"}>
                                <Image className={"w-75 p-3"} style={{borderRadius: 25}} src={"https://image.tmdb.org/t/p/w500" + movieDetails.poster_path} alt="image of movie" />

                                {username ?
                                    <>
                                        {activeUserReview ?
                                            <EditReviewModal movie={movieDetails} reviewToEditDoc={activeUserReview} />
                                            : <AddReviewModal movie={movieDetails} callback={getActiveUserReview}/>
                                        }
                                    </>
                                    : <Link href={"/enter"}>
                                        <Button variant={"green"} className={"rounded-pill text-black"}>Log in to add a review</Button>
                                    </Link>
                                }
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

function AddReviewModal(props: { movie: Movie, callback: () => void }) {
    const {user, username} = useContext(UserContext);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (event: any) => {
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

        //invalidate cache
        setTimeout(() => {props.callback();}, 200)


        //Close modal
        handleClose();
    }

    return (
        <>
            <Button variant={"green"} className={"rounded-pill text-black"} onClick={handleShow}>
                Add review
            </Button>

            <ReviewFormModal handleClose={handleClose} handleSubmit={handleSubmit} modalHeader={`Add a review for: ${props.movie.title}`} show={show} />
        </>
    );
}

function EditReviewModal(props: { movie: Movie, reviewToEditDoc: QueryDocumentSnapshot }) {
    const {user, username} = useContext(UserContext);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const placeholders = {text: props.reviewToEditDoc.get("text"), score: props.reviewToEditDoc.get("score")};

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const data = {
            ...props.reviewToEditDoc.data(),
            id: props.reviewToEditDoc.id,
            score: event.target.score.value,
            text: event.target.text.value
        }

        const JSONdata = JSON.stringify(data);

        const endpoint = '/api/reviews'

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }

        const response = await fetch(endpoint, options);
        const result = await response.json();
        // alert(`Data: ${result.data}`);

        toast.success("Review updated!");

        //Close modal
        handleClose();
    }

    return (
        <>
            <Button variant={"green"} className={"rounded-pill text-black"} onClick={handleShow}>
                Edit review
            </Button>

            <ReviewFormModal
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                modalHeader={`Edit review for: ${props.movie.title}`}
                show={show}
                placeholders={placeholders}
            />
        </>
    );
}

function ReviewFormModal(props: { modalHeader: string, show: boolean, handleClose: () => void, handleSubmit: (event: any) => any, placeholders?: { score: number, text: string } }) {
    return (
        <div onClick={e => e.stopPropagation()}>
            <Modal size={"lg"} show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.modalHeader}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={props.handleSubmit} id={"reviewForm"}>
                        <Form.Group>
                            <Form.Label>Score:</Form.Label>
                            <Form.Select required id={"score"} name={"score"}>
                                <option value="1" selected={(props.placeholders?.score == 1)}>1 - Disgusting</option>
                                <option value="2" selected={(props.placeholders?.score == 2)}>2 - Terrible</option>
                                <option value="3" selected={(props.placeholders?.score == 3)}>3 - Really bad</option>
                                <option value="4" selected={(props.placeholders?.score == 4)}>4 - Just Bad</option>
                                <option value="5" selected={(props.placeholders?.score == 5)}>5 - Average</option>
                                <option value="6" selected={(props.placeholders?.score == 6)}>6 - Passable</option>
                                <option value="7" selected={(props.placeholders?.score == 7)}>7 - Good</option>
                                <option value="8" selected={(props.placeholders?.score == 8)}>8 - Really Good</option>
                                <option value="9" selected={(props.placeholders?.score == 9)}>9 - Great</option>
                                <option value="10" selected={(props.placeholders?.score == 10)}>10 - Masterpiece</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Review Text:</Form.Label>
                            <Form.Control required id={"text"} name={"text"} as={"textarea"} rows={5} defaultValue={props.placeholders?.text} />
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
    )
}