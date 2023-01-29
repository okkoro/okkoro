import {useEffect, useState} from "react";
import banner from "public/okkoro_banner.png";
import Image from 'next/image'
import {fetchMasterList} from "../../lib/firebase";
import {useRouter} from "next/router";
import {Button, Col, Row} from "react-bootstrap";
import {getRecommendation} from "../../lib/recommendations"
import MovieList from "../../components/MovieList";
import ProfileMovieList from "../../components/ProfileMovieList";


export default function Profile() {

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

    const [reloads, setReloads] = useState(1)




    useEffect(()=>{
        if(urlusername) {
            fetchMasterList(urlusername)
                .then((res) => {
                    setUserMasterList(res);
                })
        }
    },[urlusername,reloads])

    //recom
    const {user, username} = useContext(UserContext);
    const CallApi = async function () {
        // @ts-ignore
        getRecommendation(user.uid).then((res) => {
            setMovieState(res.data);

        });
    }

    //Create list of all lists that user has
    const [listList, setListList] = useState(new Map());

    useEffect(()=>{
        listList.clear()
        setListList(new Map())
        if (userMasterList) {
            userMasterList.forEach((item) => {
                item.lists.forEach((list: String) => {
                    let mapList: string[] = [];

                    if (listList.has(list))
                        mapList = listList.get(list);

                    mapList.push(item.movieId);

                    setListList(new Map(listList.set(list, mapList)))
                })
            })
        }
    },[userMasterList])


    function example(){
        setReloads(reloads+1)
    }

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
                        <MovieList data-cy={"oneMovieList"} movies={movieState} listTitle={""}/>

                        {userMasterList != null && userMasterList.length > 0 ? (<div>
                            {Array.from(listList).map((list,index) => {
                                return <ProfileMovieList key={list[0]} listTitle={list[0]} movies={list[1]} stateUpdate={example}/>
                            })}
                        </div>) : <p>nothing</p>}
                    </div>

                </Col>
            </Row>
        </div>
    )
}