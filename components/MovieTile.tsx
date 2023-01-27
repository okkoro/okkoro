import {Card, CardImg, Button} from "react-bootstrap";
import Link from "next/link";
import {setDoc} from "@firebase/firestore";
import {doc, getDoc, getFirestore} from "firebase/firestore";
import {UserContext} from "../lib/context";
import {useContext} from "react";

type propsType = {
    movie: Movie;
    list?: string;
}


export default function MovieTile(props: propsType) {
    const db = getFirestore()
    async function fetchUserInfo() {
        return getDoc(doc(db,"users", user.uid))
    }
    async function deleteMovieFromList(id: number, list: string) {

        fetchUserInfo().then((res) => {
            var listedMovies: ListedMovie[] = res.get("listedMovies")

            listedMovies[listedMovies.findIndex(x => x.movieId == id)].lists = listedMovies[listedMovies.findIndex(x => x.movieId == id)].lists.filter(x => x !== list)
            let data = {
                listedMovies: listedMovies
            }
            console.log(listedMovies)
            setDoc(doc(db,"users", user.uid), data, { merge:true })
        })

    }
    const {user} = useContext(UserContext);
    // @ts-ignore
    return (
        <div className={"m-2"} data-cy={`MovieTile`}>
            <Card className="bg-light-gray cardAnim" style={{width: "14rem"}}>
                <Link href={"/movies/" + props.movie.id} className={"text-decoration-none text-reset"}>
                    {props.list && <div style={{background:"gray",margin:"5px",padding:"5px",borderRadius:"25px",position:"absolute",zIndex:999999}}><Button onClick={async () =>{await deleteMovieFromList(props.movie.id,props.list!)}}>X</Button></div>}
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