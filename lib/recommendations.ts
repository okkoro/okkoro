import axios from 'axios';



export async function getRecommendation(uid : string){
    return await axios.get("https://clementcadieux.pythonanywhere.com/api/recommendation/" + uid);
}

