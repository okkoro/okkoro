import {Context, useContext, useEffect, useState} from "react";
import banner from "public/okkoro_banner.png";
import Image from 'next/image'
import {collection, getDocs, where} from "@firebase/firestore";
import {getFirestore} from "firebase/firestore";
import {query} from "@firebase/database";
import {docToJSON} from "../../lib/firebase";
import {useRouter} from "next/router";
import {Button, Col, Row} from "react-bootstrap";
import {getRecommendation} from "../../lib/recommendations"
import MovieList from "../../components/MovieList";
import {UserContext} from "../../lib/context";




export default function Profile() {

    const { user, username } = useContext(UserContext);

    const router = useRouter()
    const {urlusername} = router.query


    console.log(urlusername)



    return (

        <div className="bg-green">
            {urlusername == username ? <SignedInProfile urlusername={"maximilien"}/> : <WrongProfile/>}
        </div>
    )


}

function WrongProfile(){
    return (
        <div>
            <Image src={banner.src} alt="okkoro banner" width={banner.width} height={banner.height}/>
            <h1>Woops! This isn't your account</h1>
        </div>
    )
}

function SignedInProfile(props){
    const urlusername = props.urlusername
    let [movieState, setMovieState] = useState([]);

    const [listedMovies, setListMovies] = useState([])

    async function fetchListedMovies() {
        const ref = collection(getFirestore(), 'users');
        const userInfoQuery = query(
            // @ts-ignore
            ref,
            where('username', "==", urlusername),
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
        if (urlusername) {
            fetchListedMovies()
        }

    }, [urlusername])

    const callApi = async function (){
        var res = await getRecommendation();
        // @ts-ignore
        movieState = [res.data];
        setMovieState(movieState);
    }

    return(
        <div>
            <Row>
                <Col className="text-center">
                    <Image src={banner.src} alt="okkoro banner" width={banner.width} height={banner.height}/>
                    <h1>Welcome {urlusername}</h1>
                </Col>
            </Row>
            <Row>
                <Col className="flex-row-reverse">
                    <div>
                        {/*@ts-ignore*/}
                        <MovieList movies={movieState} listTitle={""}/>
                        {listedMovies.length > 0 ? <p>something</p> : <p>nothing</p>}
                    </div>

                    {/*@ts-ignore*/}
                    <Button onClick={() => callApi()} data-cy={"recomButton"}>Get Recommendations!</Button>
                </Col>
            </Row>
        </div>
    )
}