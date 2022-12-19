import MovieTile from "../components/MovieTile";
import {doc, getFirestore} from "firebase/firestore";

// export async function getServerSideProps(){
//     const ref = doc(getFirestore(), `genres`);
//     const queryGenres = query(
//         ref,
//         where('id','')
//     )
// }

export default function Movies() {



    let movies = [
        {
            "poster_path": "/sDWARc5aYTUKE8Y2FIGVgWXuI4K.jpg",
            "title": "Twilight Zone: The Movie",
            "release_date":"1998-08-28",
            "vote_average":6.8,
            "genres": [14]
        },
        {
            "poster_path": "/wkSzJs7oMf8MIr9CQVICsvRfwA7.jpg",
            "title": "Lost in Translation",
            "release_date":"1998-08-28",
            "vote_average":8.2,
            "genres": [12]
        },
        {
            "poster_path": "/onmAHliMDEWTwksC7pAUpyVRZti.jpg",
            "title": "Barely Legal",
            "release_date":"1990-08-28",
            "vote_average":9.1,
            "genres": [12,14]
        },
        {
            "poster_path": "/mTtgpH6UnHUtD8moRJUzfGLOZTj.jpg",
            "title": "The Last King of Scotland",
            "release_date":"2003-08-28",
            "vote_average":3.6,
            "genres": [12,14,16]
        },
        {
            "poster_path": "/wkSzJs7oMf8MIr9CQVICsvRfwA7.jpg",
            "title": "Lost in Translation",
            "release_date":"1999-08-28",
            "vote_average":8.2,
            "genres": [12,14]
        }
    ]
    return (
        <div className="row bg-green">

                <h1>Movies</h1>
                {movies.map((element) =>{
                    return(
                        <div className="col text-center">
                        <MovieTile movie={element} />
                        </div>
                    )
                    })}

        </div>
    )
}