import {Card, CardImg, Button} from "react-bootstrap";
import Link from "next/link";
import {UserContext} from "../lib/context";
import {useContext} from "react";
import {deleteMovieFromList} from "../lib/firebase";

type propsType = {
    movie: Movie;
    list?: string;
    stateUpdate?: ()=>void;
}


export default function MovieTile(props: propsType) {

    const {user} = useContext(UserContext);

    async function deleteMovie(){
        // @ts-ignore
        await deleteMovieFromList(props.movie.id,props.list!,user.uid).then(
            props.stateUpdate
        )
    }

    return (
        <div className={"m-2"} data-cy={`MovieTile`}>
            <Card className="bg-light-gray cardAnim" style={{width: "14rem"}}>
                {(props.list && user) && <Button className={"xButton"} onClick={deleteMovie}>X</Button>}
                <Link href={"/movies/" + props.movie.id} className={"text-decoration-none text-reset"}>
                    <CardImg src={"https://image.tmdb.org/t/p/w500" + props.movie.poster_path} alt="image of movie" />
                    <Card.Body className={"cardTextPos"}>
                        <Card.Title data-cy={`MovieTitle`}>{props.movie.title}</Card.Title>
                        <Card.Text className={"text-start  mb-auto"}>
                            <b data-cy={`MovieReleaseDate`}>{props.movie.release_date.substring(0, 4)}</b>
                            <br />
                            {props.movie.vote_average}
                        </Card.Text>
                    </Card.Body>
                </Link>
            </Card>
        </div>
    )
}