import axios, {AxiosResponse} from 'axios';
import {getMovieById} from "./firebase";



export async function getRecommendation(){
    const movieIds = await axios.get("https://clementcadieux.pythonanywhere.com/api/recommendation/");
    return await convertIdsToMovies(movieIds);
}

async function convertIdsToMovies(movieIds: AxiosResponse){
    const movies = [];
    for (let movieId in movieIds.data){
        movies.push(getMovieById(parseInt(movieId)));
    }
    return movieIds;
}

