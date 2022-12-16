import {Card, CardGroup, CardImg} from "react-bootstrap";
export default function MovieTile(props){
    return (
        <div>
            <Card style={{width: "200px"}}>
                <CardImg src={"https://image.tmdb.org/t/p/w500" + props.movie.poster_path} alt="image of movie" />
                <CardGroup>
                    <h5 className="card-title">{props.movie.title}</h5>
                    <p className="card-text">{props.movie.vote_average}</p>
                </CardGroup>
            </Card>
        </div>
    )
}