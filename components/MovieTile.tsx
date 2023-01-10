import {Card, CardImg} from "react-bootstrap";

//TODO: proper movie type
export default function MovieTile(props: any){

    return (
        <div style={{margin:"1rem"}} data-cy={`MovieTile`}>
            <Card className="bg-light-gray" style={{width:"14rem"}}>
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