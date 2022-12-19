import {Card, CardGroup, CardImg} from "react-bootstrap";
export default function MovieTile(props){

    return (
        <div>
            <Card className="bg-light-gray"style={{width:"12rem"}}>
                <CardImg src={"https://image.tmdb.org/t/p/w500" + props.movie.poster_path} alt="image of movie" />
                <Card.Body>
                    <Card.Title>{props.movie.title}</Card.Title>
                    <Card.Text className={"text-start"}>
                        <b>{props.movie.release_date.substring(0,4)}</b>
                        <br/>
                        {props.movie.vote_average}
                    </Card.Text>

                </Card.Body>
            </Card>
        </div>
    )
}