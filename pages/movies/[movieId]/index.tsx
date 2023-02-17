import {useRouter} from "next/router";
import {getMovieById, getReviewByMovieAndUsername} from "../../../lib/firebase";
import {useContext, useState} from "react";
import {Button, Col, Container, Form, Image, Modal, Row} from "react-bootstrap";
import {ReviewLister} from "../../../components/ReviewLister";
import {UserContext} from "../../../lib/context";

import toast from "react-hot-toast";
import {QueryDocumentSnapshot} from "@firebase/firestore";
import Link from "next/link";
import {createReview, updateReview} from "../../../lib/reviews";
import {useTranslation} from "react-i18next";

export default function MovieDetails() {
    const {username} = useContext(UserContext);
    const {movieId} = useRouter().query;

    const {t} = useTranslation();

    const [movieDetails, setMovieDetails] = useState(null as any);
    const [movieGenres, setMovieGenres] = useState(null);

    const [activeUserReview, setActiveUserReview] = useState(null);

    if (typeof movieId === "string" && (movieDetails == null || movieDetails.id != movieId)) {
        //console.log("calling getMovieById");
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
            // console.log("calling getReviewByMovieAndUsername");
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
        <Row>
            <Col>
                {movieDetails != null && (
                    <Container>
                        <Row>
                            <Col className={"text-center"}>
                                <Image className={"w-75 p-3"} style={{borderRadius: 25}} src={"https://image.tmdb.org/t/p/w500" + movieDetails.poster_path} alt="image of movie" />

                                <br/>

                                {username ?
                                    <>
                                        {activeUserReview ?
                                            <EditReviewModal movie={movieDetails} reviewToEditDoc={activeUserReview} />
                                            : <AddReviewModal movie={movieDetails} callback={getActiveUserReview}/>
                                        }
                                    </>
                                    : <Link href={"/enter"}>
                                        <Button variant={"green"} className={"rounded-pill text-black"}>{t("moviesLogInRequired")}</Button>
                                    </Link>
                                }
                            </Col>

                            <Col className={"col-lg-9"}>
                                <div className={"d-flex flex-row"}>
                                    <h1 className={"d-inline"} data-cy={`MovieTitle`}>{movieDetails.title}</h1>
                                    <Link className={"ms-auto align-self-center btn btn-green rounded-pill"} href={"/movies/" + movieId + "/lists"} data-cy={"addToListButton"}>{t("moviesAddToList")}</Link>
                                </div>

                                <p>{movieDetails.release_date}</p>
                                <p>{movieDetails.vote_average}/10</p>
                                <p>{movieGenres}</p>
                                <p>{movieDetails.overview}</p>
                            </Col>
                        </Row>

                        <h3 className={"ps-3 mt-3 mb-2"}>{t("movieReviewLabel")}</h3>
                        <ReviewLister movieId={movieDetails.id} />

                    </Container>
                )}
            </Col>
        </Row>
    )
}

function AddReviewModal(props: { movie: Movie, callback: () => void }) {
    const {user, username} = useContext(UserContext);
    const {t} = useTranslation();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        // @ts-ignore
        const review : Review = {movieId: props.movie.id, userId: username, score: event.target.score.value, text: event.target.text.value}


        // alert(`Data: ${result.data}`);

        const res = await createReview(review);

        if (res)
            toast.success(t("moviesReviewCreateSuccess"));
        else
            toast.error(t("moviesReviewCreateFailure"));

        //invalidate cache
        // setTimeout(() => {props.callback();}, 200)
        props.callback();

        //Close modal
        handleClose();
    }

    return (
        <>
            <Button variant={"green"} className={"rounded-pill text-black"} onClick={handleShow}>
                {t("moviesAddReview")}
            </Button>

            <ReviewFormModal handleClose={handleClose} handleSubmit={handleSubmit} modalHeader={`${t("moviesReviewAddReviewModalHeader")} ${props.movie.title}`} show={show} />
        </>
    );
}

function EditReviewModal(props: { movie: Movie, reviewToEditDoc: QueryDocumentSnapshot }) {
    const {user, username} = useContext(UserContext);
    const {t} = useTranslation();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const placeholders = {text: props.reviewToEditDoc.get("text"), score: props.reviewToEditDoc.get("score")};

    const handleSubmit = async (event: any) => {
        //Close modal
        handleClose();

        event.preventDefault();

        // @ts-ignore
        const review : Review = {...props.reviewToEditDoc.data(), id: props.reviewToEditDoc.id, score: event.target.score.value, text: event.target.text.value}

        const res = await updateReview(review);

        if (res)
            toast.success(t("moviesReviewUpdateSuccess"));
        else
            toast.error(t("moviesReviewUpdateFailure"));

        //Close modal
        handleClose();
    }

    return (
        <>
            <Button variant={"green"} className={"rounded-pill text-black"} onClick={handleShow}>
                {t("moviesEditReview")}
            </Button>

            <ReviewFormModal
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                modalHeader={`${t("moviesReviewEditReviewModalHeader")} ${props.movie.title}`}
                show={show}
                placeholders={placeholders}
            />
        </>
    );
}

function ReviewFormModal(props: { modalHeader: string, show: boolean, handleClose: () => void, handleSubmit: (event: any) => any, placeholders?: { score: number, text: string } }) {
    const {t} = useTranslation();

    return (
        <div onClick={e => e.stopPropagation()}>
            <Modal size={"lg"} show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.modalHeader}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={props.handleSubmit} id={"reviewForm"}>
                        <Form.Group>
                            <Form.Label>{t("moviesReviewScoreFormLabel")}</Form.Label>
                            <Form.Select required id={"score"} name={"score"}>
                                <option value="1" selected={(props.placeholders?.score == 1)}>1 - {t("moviesReviewScore1")}</option>
                                <option value="2" selected={(props.placeholders?.score == 2)}>2 - {t("moviesReviewScore2")}</option>
                                <option value="3" selected={(props.placeholders?.score == 3)}>3 - {t("moviesReviewScore3")}</option>
                                <option value="4" selected={(props.placeholders?.score == 4)}>4 - {t("moviesReviewScore4")}</option>
                                <option value="5" selected={(props.placeholders?.score == 5)}>5 - {t("moviesReviewScore5")}</option>
                                <option value="6" selected={(props.placeholders?.score == 6)}>6 - {t("moviesReviewScore6")}</option>
                                <option value="7" selected={(props.placeholders?.score == 7)}>7 - {t("moviesReviewScore7")}</option>
                                <option value="8" selected={(props.placeholders?.score == 8)}>8 - {t("moviesReviewScore8")}</option>
                                <option value="9" selected={(props.placeholders?.score == 9)}>9 - {t("moviesReviewScore9")}</option>
                                <option value="10" selected={(props.placeholders?.score == 10)}>10 - {t("moviesReviewScore10")}</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{t("moviesReviewTextFormLabel")}</Form.Label>
                            <Form.Control required id={"text"} name={"text"} as={"textarea"} rows={5} defaultValue={props.placeholders?.text} />
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type={"submit"} form={"reviewForm"}>
                        {t("save")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}