import {Card, CardImg} from "react-bootstrap";
import Link from "next/link";

type propsType = {
    movie: Movie;
}

export default function MovieTile(props: propsType) {

    return (
        <div className={"m-2"} data-cy={`MovieTile`}>
            <Card className="bg-light-gray cardAnim" style={{width: "14rem"}}>
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