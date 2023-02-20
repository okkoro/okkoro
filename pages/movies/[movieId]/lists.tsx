import {useContext, useState} from "react";
import {UserContext} from "../../../lib/context";
import {useRouter} from "next/router";
import {getMovieById, getUserByUsername, addMovieToList} from "../../../lib/firebase";
import {Col, Container, Form, Image, Row} from "react-bootstrap";
import toast from "react-hot-toast";
import {useTranslation} from "react-i18next";

export default function AddToList() {
    const {t} = useTranslation();
    const router = useRouter();

    const {movieId} = router.query;

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

    const {user, username} = useContext(UserContext);

    // @ts-ignore
    const userQuery = getUserByUsername(username);

    const lists = ["liked", "watched"];

    if(userQuery && userQuery.at(0)){
        // @ts-ignore
        for(let i = 0; i < userQuery.at(0).listedMovies.at(0).lists.length; i++){
            // @ts-ignore
            const list = userQuery.at(0).listedMovies.at(0).lists[i]

            if(lists.indexOf(list) == -1){
                lists.push(list);
            }
        }
    }

    const addToList = async (event: any) => {
        event.preventDefault();

        // @ts-ignore
        const res = await addMovieToList(movieId, userQuery.at(0), document.getElementById("list-selector").value, user)

        if (res) {
            toast.success(t("moviesListSuccess"));
            await router.push("/movies/" + movieId);
        }
        else {
            toast.error(t("moviesListFailure"));
        }
    }

    return (
        <div className="row">
            <div className="col">
                {movieDetails != null && (
                    <Container>
                        <Row>
                            <Col className={"col-6 d-flex flex-row"}>
                                <Image className={"w-50 p-3"} style={{borderRadius: 25}} src={"https://image.tmdb.org/t/p/w500" + movieDetails.poster_path} alt="image of movie" />

                                <div className={"p-2"}>
                                    <h1 data-cy={`MovieTitle`}>{movieDetails.title}</h1>
                                    <p>{movieDetails.release_date}</p>
                                    <p>{movieDetails.vote_average}/10</p>
                                    <p>{movieGenres}</p>
                                </div>
                            </Col>
                            <Col className={"col-4 p-3 text-center"}>
                                <Form>
                                    <Form.Label><h4>{t("moviesListFormHeader", {title: movieDetails.title})}</h4></Form.Label>
                                    
                                    <Form.Select data-cy={"list-selector"} id={"list-selector"}>
                                        {lists.map((list) => <option key={list} value={list}>{list.charAt(0).toUpperCase() + list.substring(1)}</option>)}
                                    </Form.Select>
                                    {/*// @ts-ignore*/}
                                    <Form.Control type={"submit"} className={"btn btn-green w-50 mt-3"} value={t("save")} onClick={addToList} data-cy={"submit-button"}/>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                )}
            </div>
        </div>
    )
}