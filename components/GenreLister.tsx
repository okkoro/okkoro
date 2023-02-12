import {Button} from "react-bootstrap";
import {useContext, useState} from "react";
import {UserContext} from "../lib/context";
import {updateGenres} from "../lib/firebase";


export function GenreLister(props: { genres: Genre[] }) {

    const {user} = useContext(UserContext);

    const genres = props.genres;

    function handler(genre: Genre){
        genres[genres.findIndex((obj => obj.id == genre.id))].isChosen = !genre.isChosen
    }

    function submit(){
        if(user) {
            // @ts-ignore
            updateGenres(user.uid, genres)
        }
    }

    return (
        <div>
            <ul>
                {genres && genres.length > 0 ? genres.map((genre) =>
                        <li key={genre.id}><GenreItem genre={genre} state={genres} handler={handler}/></li>
                    ) : <div>Nothing</div>
                }
            </ul>
            <Button onClick={submit}>Submit</Button>
        </div>
    );
}

export function GenreItem(props: { genre: Genre, state: Genre[], handler: (genre:Genre)=>void}) {
    var genre = props.genre
    const [checked, setChecked] = useState(genre.isChosen);
    const handleChange = () => {
        setChecked(!checked);
        genre.isChosen = checked
        props.handler(genre)
    };

    return (
        <label>
            <input
                type="checkbox"
                checked={checked}
                onChange={handleChange}
            />
            {genre.name}
        </label>
    )
}