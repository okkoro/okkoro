import {useContext, useState} from "react";
import banner from "public/okkoro_banner.png";
import Image from 'next/image'
import {collection, getDocs, where} from "@firebase/firestore";
import {getFirestore} from "firebase/firestore";
import {query} from "@firebase/database";
import {docToJSON} from "../../lib/firebase";
import {useRouter} from "next/router";
import {Button, Col, Row} from "react-bootstrap";
import {getRecommendation, convertIdsToMovies} from "../../lib/recommendations"
import MovieList from "../../components/MovieList";
import {UserContext} from "../../lib/context";
import ProfileMovieList from "../../components/ProfileMovieList";


export default function Profile() {

    //const {username} = useContext(UserContext);

    const router = useRouter()
    const {urlusername} = router.query

    return (

        <div className="row">
            {/*{urlusername == username ? <SignedInProfile urlusername={urlusername}/> : <WrongProfile/>}*/}
            <SignedInProfile urlusername={urlusername}/>
        </div>
    )


}

function WrongProfile() {
    return (
        <div>
            <Image src={banner.src} alt="okkoro banner" width={banner.width} height={banner.height}/>
            <h1>{"Woops! This isn't your account"}</h1>
        </div>
    )
}

function SignedInProfile(props: { urlusername: any; }) {
    const urlusername = props.urlusername

    //recoms
    let [movieState, setMovieState] = useState([]);

    const [userMasterList, setUserMasterList] = useState(null as (any[] | null))

    async function fetchMasterList(urlUsername: string) {
        const ref = collection(getFirestore(), 'users');
        const userInfoQuery = query(
            // @ts-ignore
            ref,
            where('username', "==", urlUsername)
        )

        // @ts-ignore
        const userInfo = docToJSON((await getDocs(userInfoQuery)).docs[0]);

        // console.table(userInfo);

        return userInfo.listedMovies;
    }



    if (typeof urlusername === "string" && userMasterList == null) {
        fetchMasterList(urlusername)
            .then((res) => {
                setUserMasterList(res);
            })
    }

    //recom
    const {user, username} = useContext(UserContext);
    const CallApi = async function () {
        // @ts-ignore
        getRecommendation(user.uid).then((res) => {
            setMovieState(res.data);
        });
        // @ts-ignore

    }

    //Create list of all lists that user has
    let listList = new Map();

    if (userMasterList) {
        userMasterList.forEach((item) => {
            item.lists.forEach((list: String) => {
                let mapList: string[] = [];

                if (listList.has(list))
                    mapList = listList.get(list);

                mapList.push(item.movieId);

                listList.set(list, mapList);
            })
        })
    }

    const movies = convertIdsToMovies(movieState);
    console.log(movies);

    // @ts-ignore
    return (
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
                        <Button onClick={() => CallApi()} data-cy={"recomButton"}>Get Recommendations!</Button>
                        {/*//@ts-ignore*/}
                        {movies.length > 0 ? <MovieList data-cy={"oneMovieList"} movies={movies} listTitle={""}/> : <MovieList data-cy={"oneMovieList"} movies={[]} listTitle={""}/>}
                        {userMasterList != null && userMasterList.length > 0 ? (<div>
                            {Array.from(listList).map((list) => {
                                return <ProfileMovieList key={list[0]} listTitle={list[0]} movies={list[1]}/>
                            })}



                        </div>) : <p>nothing</p>}
                    </div>

                </Col>
            </Row>
        </div>
    )
}