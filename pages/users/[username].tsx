import {useContext, useState} from "react";
import {UserContext} from "../../lib/context";
import {Button, Col, Row} from "react-bootstrap";
import {getRecommendation} from "../../lib/recommendations"
import MovieList from "../../components/MovieList";

import banner from "public/okkoro_banner.png";
import Image from 'next/image'

export default function Profile() {
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
                    <Image src={banner.src} alt="okkoro banner" width={banner.width} height={banner.height}/>
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