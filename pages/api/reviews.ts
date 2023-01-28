import {addDoc, collection, serverTimestamp} from "@firebase/firestore";
import {getFirestore} from "firebase/firestore";

export default function handler(req: any, res: any) {
    const body = req.body;

    // console.log('body: ', body);

    //Server side validation
    if (!body.score || !body.text) {
        return res.status(400).json({data: "Missing score or text"});
    }

    //Add timestamp to data
    body.date = serverTimestamp();


    addDoc(collection(getFirestore(), 'reviews'), body)
        .catch((e) => {
            console.log("failed adding new review: " + body);
            throw e;
        });

    res.status(200).json({data: `Score: ${body.score} / Text: ${body.text}`});
}