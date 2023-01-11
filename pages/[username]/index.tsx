import {useContext, useState} from "react";
import {UserContext} from "../../lib/context";
import {Button, Col, Row} from "react-bootstrap";
import {getRecommendation} from "../../lib/recommendations"
import MovieList from "../../components/MovieList";


export default function Page() {
    const { user, username } = useContext(UserContext);
    let [movieState, setMovieState] = useState([]);

    const callApi = async function (){
        var res = await getRecommendation();
        // @ts-ignore
        movieState = [res.data];
        setMovieState(movieState);
    }
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <div className="bg-green">
            <Row>
                <Col className="text-center">
                    <img src="okkoro.png" />
                    <h1>Welcome {username}</h1>
                </Col>
            </Row>
            <Row>
                <Col className="flex-row-reverse">
                    <div>
                        {/*@ts-ignore*/}
                        <MovieList movies={movieState} listTitle={""}/>
                    </div>

                    {/*@ts-ignore*/}
                    <Button onClick={() => callApi()} data-cy={"recomButton"}>Get Recommendations!</Button>
                </Col>
            </Row>
        </div>
    )
}