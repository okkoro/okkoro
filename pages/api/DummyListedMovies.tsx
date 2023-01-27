import {setDoc} from "@firebase/firestore";
import {doc, getFirestore} from "firebase/firestore";

export default function handler(req, res) {
    const db = getFirestore()
    if (req.method === 'POST') {
        let listedMovies = [{movieId:100,lists:["watched","liked"]},{movieId:10023,lists:["watched","liked"]},{movieId:10054,lists:["watched","liked"]},{movieId:10063,lists:["watched","liked"]},{movieId:10069,lists:["liked"]},{movieId:10072,lists:["watched"]}]
        let data = {
            listedMovies: listedMovies
        }
        setDoc(doc(db,"users", "gbshXEk8WHWgvkzgp4fX4oRV9Aq2"), data, { merge:true })
            .then(docRef => {
                alert("Entire Document has been updated successfully");
            })
            .catch(error => {
                alert(error);
            })
        return res.status(200).json({ test: 'posted' })
    } else {
        res.status(200).json({ test: 'works' })
    }
}