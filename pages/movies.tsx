import MovieTile from "../components/MovieTile";

export default function Home() {
    let movies = [
        {
            "poster_path": "/sDWARc5aYTUKE8Y2FIGVgWXuI4K.jpg",
            "title": "Twilight Zone: The Movie",
            "vote_average":6.8
        },
        {
            "poster_path": "/wkSzJs7oMf8MIr9CQVICsvRfwA7.jpg",
            "title": "Lost in Translation",
            "vote_average":8.2
        },
        {
            "poster_path": "/onmAHliMDEWTwksC7pAUpyVRZti.jpg",
            "title": "Barely Legal",
            "vote_average":9.1
        },
        {
            "poster_path": "/mTtgpH6UnHUtD8moRJUzfGLOZTj.jpg",
            "title": "The Last King of Scotland",
            "vote_average":3.6
        }
    ]
    return (
        <div className="row bg-green">
            <div className="col text-center">
                <h1>Movies</h1>

                {movies.map((element) =>{
                    return(<MovieTile movie={element} />)
                    })}

            </div>
        </div>
    )
}