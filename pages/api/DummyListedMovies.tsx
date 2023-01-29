import {setDoc} from "@firebase/firestore";
import {doc, getFirestore} from "firebase/firestore";

export default function handler(req: { method: string; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { test: string; }): void; new(): any; }; }; }) {
    const db = getFirestore()
    if (req.method === 'POST') {
        let listedMovies: ListedMovie[] = [{movieId:100,lists:["watched","liked"]},{movieId:10023,lists:["watched","liked"]},{movieId:10054,lists:["watched","liked"]},{movieId:10063,lists:["watched","liked"]},{movieId:10069,lists:["liked"]},{movieId:10072,lists:["watched"]}]
        let data = {
            listedMovies: listedMovies
        }
        setDoc(doc(db,"users", "qJac9C1xKyZvdNvdeLmty5rQsaX2"), data, { merge:true })
            .then(() => {
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