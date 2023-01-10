import axios, {isCancel, AxiosError} from 'axios';



export async function getRecommendation(){
    return await axios.get("http://clementcadieux.pythonanywhere.com/api/recommendation");
}

