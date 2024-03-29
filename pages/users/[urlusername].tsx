import {useContext, useEffect, useState} from "react";
import banner from "public/okkoro_banner.png";
import Image from 'next/image'
import {fetchAllGenres, fetchGenres, fetchMasterList} from "../../lib/firebase";
import {useRouter} from "next/router";
import {Button, Col, Row} from "react-bootstrap";
import {getRecommendation} from "../../lib/recommendations"
import MovieList from "../../components/MovieList";
import ProfileMovieList from "../../components/ProfileMovieList";
import {UserContext} from "../../lib/context";
import {GenreLister} from "../../components/GenreLister";
import {useTranslation} from "react-i18next";



export default function Profile() {

    const router = useRouter()
    const {urlusername} = router.query

    return (

        <div className="row">
            <SignedInProfile urlusername={urlusername}/>
        </div>
    )


}

function SignedInProfile(props: { urlusername: any; }) {
    const {t} = useTranslation();
    const urlusername = props.urlusername

    //recoms
    let [movieState, setMovieState] = useState([]);

    const [userMasterList, setUserMasterList] = useState(null as (any[] | null))

    const [reloads, setReloads] = useState(1)

    const [genres, setGenres] = useState<Genre[]>([])

    const {user, username} = useContext(UserContext);


    useEffect(()=>{
        if(urlusername) {
            fetchMasterList(urlusername)
                .then((res) => {
                    setUserMasterList(res);
                })
        }
    },[urlusername,reloads])

    //recom


    useEffect(()=>{
        let obtainedGenres : number[] = []
        let data : Genre[] = []
        if(user) {
            // @ts-ignore
            fetchGenres(user.uid).then((userGenres) => {
                if(userGenres) {
                    userGenres.forEach((userGenre: Genre) => {
                        obtainedGenres.push(userGenre.id)
                    })
                }
                fetchAllGenres().then((possibleGenres)=>{
                    possibleGenres.forEach((possibleGenre)=>{
                        if(obtainedGenres.includes(possibleGenre.id)){
                            data.push({id:possibleGenre.id,name:possibleGenre.name,isChosen:true})
                        }else{
                            data.push({id:possibleGenre.id,name:possibleGenre.name,isChosen:false})
                        }
                    })
                    setGenres(data);
                })

            })
        }

    },[user])

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
                    <h1>{t("profileLanding", {username: urlusername})}</h1>
                </Col>
            </Row>
            <Row>
                <Col className="flex-row-reverse">
                    <div>
                        {(username && username == urlusername) &&
                            <>
                                <Button variant={"pink"} className={"rounded-pill text-black"} onClick={() => CallApi()} data-cy={"recomButton"}>{t("profileGetRecomBtn")}</Button>
                                {/*//@ts-ignore*/}
                                <MovieList data-cy={"oneMovieList"} movies={movieState} listTitle={""}/>
                            </>
                        }

                        {(username && username == urlusername) &&
                            <GenreLister genres={genres}/>
                        }

                        {userMasterList != null && userMasterList.length > 0 ? (<div>
                            {Array.from(listList).sort((a,b) => (a.at(0) > b.at(0)) ? 1 : ((b.at(0) > a.at(0)) ? -1 : 0)).map((list) => {
                                return <ProfileMovieList key={list[0]} listTitle={list[0]} movies={list[1]} stateUpdate={example}/>
                            })}
                        </div>) : <p>{t("profileNothingMessage")}</p>}
                    </div>

                </Col>
            </Row>
        </div>
    )
}