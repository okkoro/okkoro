import {Button, Modal} from "react-bootstrap";
import {useContext, useState} from "react";
import {UserContext} from "../lib/context";
import {updateGenres} from "../lib/firebase";
import toast from "react-hot-toast";


export function GenreLister(props: { genres: Genre[] }) {

    const {user, username} = useContext(UserContext);

    const genres = props.genres;

    const [showPref, setShowPref] = useState(false)

    function handler(genre: Genre){
        genres[genres.findIndex((obj => obj.id == genre.id))].isChosen = !genre.isChosen
    }

    function submit(){
        // @ts-ignore
        updateGenres(user.uid, genres).then(()=> {
            setShowPref(false)
            toast.success("Preferences Updated");
        }).catch(()=>{
            alert("error updating preferences")
        })
    }

    function prefToggle(){
        setShowPref(!showPref)
    }

    function handleClose(){
        setShowPref(false);
    }

    return (
        <>
            <Button variant={"green"} className={"rounded-pill text-black"} onClick={prefToggle}>Edit Preferences</Button>
            <Modal size={"lg"} show={showPref} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{username}&apos;s Preferences</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <ul>
                    {genres && genres.length > 0 ? genres.map((genre) =>
                            <li key={genre.id}><GenreItem genre={genre} state={genres} handler={handler}/></li>
                        ) : <div>Loading Genres...</div>
                    }
                </ul>
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={submit}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
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