import {addDoc, collection, serverTimestamp, setDoc} from "@firebase/firestore";
import {doc, getFirestore} from "firebase/firestore";

//formerly an endpoint, cannot get firebase to connect on serverless functions so moving it here.
/*
export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        const body = req.body;

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

    } else if (req.method === 'PUT') {
        const body = req.body;

        const id = body.id;
        delete body.id;

        //Server side validation
        if (!body.score || !body.text) {
            return res.status(400).json({data: "Missing score or text"});
        }
        //TODO: possibly add security checks around ID and username?

        //Add timestamp to data
        body.date = serverTimestamp();

        setDoc(doc(getFirestore(), 'reviews', id), body)
            .catch((e) => {
                console.log("failed adding new review: " + body);
                throw e;
            });

        res.status(200).json({data: `Score: ${body.score} / Text: ${body.text}`});

    }
}
*/

export async function createReview(review: Review) {
    //validation
    if (!review.score || !review.text) {
        return null;
    }

    //Add timestamp to data
    review.date = serverTimestamp();

    addDoc(collection(getFirestore(), 'reviews'), review)
        .catch((e) => {
            console.log("failed adding new review: " + review);
            throw e;
        });

    return review;
}

export async function updateReview(review: Review) {
    if (review.id) {
        const id = review.id.toString();
        delete review.id;

        if (!review.score || !review.text) {
            return null;
        }

        review.date = serverTimestamp();

        setDoc(doc(getFirestore(), 'reviews', id), review)
            .catch((e) => {
                console.log("failed adding new review: " + review);
                throw e;
            });

        return review;
    } else {
        return null;
    }
}