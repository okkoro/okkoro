import axios, {isCancel, AxiosError} from 'axios';



export async function getRecommendation(){
    return await axios.get("https://clementcadieux.pythonanywhere.com/api/recommendation");
}

