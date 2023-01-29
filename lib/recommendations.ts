import axios, {AxiosResponse} from 'axios';
import {getMovieById} from "./firebase";
import {useContext} from "react";



export async function getRecommendation(uid : string){
    return await axios.get("https://clementcadieux.pythonanywhere.com/api/recommendation/" + uid);
}

export async function convertIdsToMovies(movieIds: string[]){
    const movies = [];
    for (let movieId in movieIds){
        // @ts-ignore
        movies.push(await getMovieById(parseInt(movieId.at(0))));
    }
    return movies;
}

