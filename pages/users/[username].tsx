import {Context, useContext, useEffect, useState} from "react";
import banner from "public/okkoro_banner.png";
import Image from 'next/image'
import {collection, getDocs, where} from "@firebase/firestore";
import {getFirestore} from "firebase/firestore";
import {query} from "@firebase/database";
import {docToJSON} from "../../lib/firebase";

const LIMIT = 20;

// export async function getServerSideProps(context) {
//     const { username } = context.query;
//
//     const ref = collection(getFirestore(), 'users');
//     const genreQuery = query(
//         // @ts-ignore
//         ref,
//         where('username', "==", username),
//
//     )
//
//     // @ts-ignore
//     const user = (await getDocs(genreQuery)).docs.map(docToJSON);
//
//
//     return {
//         props: {user}
//     }
//
// }

// type propsType = {
//     user: any;
// }


export default function Profile() {

    //const { user, user } = useContext(UserContext);

    //const router = useRouter()
    //const { user } = router.query

    const [user, setUser] = useState("maximilien")

    const [listedMovies, setListMovies] = useState([])

    // @ts-ignore
    useEffect(()=>{
        async function fetchListedMovies(){
            await user
            console.log(user+" in")
            const ref = collection(getFirestore(), 'users');
            const genreQuery = query(
                // @ts-ignore
                ref,
                where('username', "==", user),

            )
            // @ts-ignore
            const userInfo = (await getDocs(genreQuery)).docs.map(docToJSON);

            setListMovies(userInfo[0].listedMovies)
        }
        fetchListedMovies()

    },[user])





    console.log(user+" out")

    return (
        <div className="row bg-green">
            <div className="col text-center">
                <Image src={banner.src} alt="okkoro banner" width={banner.width} height={banner.height}/>
                <h1>Welcome {user}</h1>
                {listedMovies.length > 0 ? <p>something</p> : <p>nothing</p>}
                {/*<MovieList movies={movies} listTitle={"Liked Movies"}/>*/}

            </div>
        </div>
    )
}