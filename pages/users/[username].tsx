import {Context, useContext, useEffect, useState} from "react";
import banner from "public/okkoro_banner.png";
import Image from 'next/image'
import {collection, getDocs, where} from "@firebase/firestore";
import {getFirestore} from "firebase/firestore";
import {query} from "@firebase/database";
import {docToJSON} from "../../lib/firebase";
import {useRouter} from "next/router";




export default function Profile() {

    //const { user, user } = useContext(UserContext);



    const router = useRouter()
    const {username} = router.query

    const [listedMovies, setListMovies] = useState([])

    async function fetchListedMovies() {
        const ref = collection(getFirestore(), 'users');
        const userInfoQuery = query(
            // @ts-ignore
            ref,
            where('username', "==", username),
        )

        // @ts-ignore
        const userInfo = (await getDocs(userInfoQuery)).docs.map(docToJSON);

        console.table(userInfo);

        // @ts-ignore
        setListMovies(userInfo[0].listedMovies)

        fetchMovieLists()
    }

    async function fetchMovieLists(){
        for(const movie in listedMovies){
            console.log(movie)
            const ref = collection(getFirestore(), 'movies');
            const userInfoQuery = query(
                // @ts-ignore
                ref,
                where('id', "==", movie),
            )

            // @ts-ignore
            const userInfo = (await getDocs(userInfoQuery)).docs.map(docToJSON);
        }
    }

    // @ts-ignore
    useEffect(() => {
        if (username) {
            fetchListedMovies()
        }

    }, [username])


    return (
        <div className="row bg-green">
            <div className="col text-center">
                <Image src={banner.src} alt="okkoro banner" width={banner.width} height={banner.height}/>
                <h1>Welcome {username}</h1>
                {listedMovies.length > 0 ? <p>something</p> : <p>nothing</p>}
                {/*<MovieList movies={movies} listTitle={"Liked Movies"}/>*/}

            </div>
        </div>
    )
}