import {useContext, useState} from "react";
import {UserContext} from "../../../lib/context";
import MovieTile from "../../../components/MovieTile";
import {useRouter} from "next/router";
import {getMovieById, getUserByUsername, addMovieToList} from "../../../lib/firebase";
import {Col, Container, Dropdown, Form, Image, Row} from "react-bootstrap";
import Link from "next/link";

export default function AddToList() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {movieId} = useRouter().query;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [movieDetails, setMovieDetails] = useState(null as any);
    // eslint-disable-next-line react-hooks/rules-of-hooks
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

    const addToList = async function(){
        // @ts-ignore
        await addMovieToList(movieId, userQuery.at(0), document.getElementById("list-selector").value, user)
    }

    // @ts-ignore
    return (
        <div className="row">
            <div className="col">
                {movieDetails != null && (
                    <Container>
                        <Row>
                            <Col>
                                <Image className={"w-75 p-3"} style={{borderRadius: 25}} src={"https://image.tmdb.org/t/p/w500" + movieDetails.poster_path} alt="image of movie" />
                            </Col>
                            <Col className={"col-lg-5 col-md-6"}>
                                <h1 data-cy={`MovieTitle`}>{movieDetails.title}</h1>
                                <p>{movieDetails.release_date}</p>
                                <p>{movieDetails.vote_average}/10</p>
                                <p>{movieGenres}</p>
                            </Col>
                            <Col className={"col-lg-2 col-md-6"}>
                                <form action={"/movies/" + movieId}>
                                    <select data-cy={"list-selector"} id={"list-selector"}>
                                        {lists.map((list) => <option key={list} value={list}>{list.charAt(0).toUpperCase() + list.substring(1)}</option>)}
                                    </select>

                                    <input type={"submit"} value={"Add to this list"} onClick={addToList} data-cy={"submit-button"}></input>
                                </form>
                            </Col>
                        </Row>
                    </Container>
                )}
            </div>
        </div>
    )
}