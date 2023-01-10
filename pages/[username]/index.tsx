import {useContext} from "react";
import {UserContext} from "../../lib/context";
import {Button, Col, Row} from "react-bootstrap";
import {Console} from "inspector";


export default function Page() {
    const { user, username } = useContext(UserContext);

    const callApi = function (){
        alert("Hello")
    }
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
                    <div id="MovieResult"></div>
                    {/*@ts-ignore*/}
                    <Button onClick={() => callApi()}>Get Recommendations!</Button>
                </Col>
            </Row>
        </div>
    )
}