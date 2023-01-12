import {useContext, useState} from "react";
import banner from "public/okkoro_banner.png";
import Image from 'next/image'
import {collection, getDocs, where} from "@firebase/firestore";
import {getFirestore} from "firebase/firestore";
import {query} from "@firebase/database";
import {docToJSON} from "../../lib/firebase";
import {useRouter} from "next/router";
import {Button, Col, Container, Row} from "react-bootstrap";
import {getRecommendation} from "../../lib/recommendations"
import MovieList from "../../components/MovieList";
import {UserContext} from "../../lib/context";
import ProfileMovieList from "../../components/ProfileMovieList";


export default function Profile() {

    const {username} = useContext(UserContext);

    const router = useRouter()
    const {urlusername} = router.query
    // console.log(urlusername)

    return (

        <div className="row bg-green">
            {urlusername == username ? <SignedInProfile urlusername={"maximilien"}/> : <WrongProfile/>}
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
        console.log("DBCALLED!")
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
    const callApi = async function () {
        var res = await getRecommendation();
        // @ts-ignore
        movieState = [res.data];
        setMovieState(movieState);
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

    console.log(listList)
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
                        {/*//@ts-ignore*/}
                        <MovieList movies={movieState} listTitle={""}/>
                        {userMasterList != null && userMasterList.length > 0 ? (<div>
                            {Array.from(listList).map((list) => {
                                return <ProfileMovieList key={list[0]} listTitle={list[0]} movies={list[1]}/>
                                return <div key={list[0]}>
                                    <b>{list[0]}</b>
                                    {list[1].map((movie: number) => {
                                        console.log(listList)
                                        return (<div key={movie}>{movie}</div>)
                                    })}
                                </div>
                            })}



                        </div>) : <p>nothing</p>}
                    </div>

                    {/*@ts-ignore*/}
                    <Button onClick={() => callApi()} data-cy={"recomButton"}>Get Recommendations!</Button>
                </Col>
            </Row>
        </div>
    )
}