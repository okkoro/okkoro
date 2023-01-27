import {collection, query, where} from "@firebase/firestore";
import {getFirestore} from "firebase/firestore";
import {useCollection} from "react-firebase-hooks/firestore";
import {Button, Col, Row} from "react-bootstrap";
import Image from "next/image";


export function ReviewLister(props: { movieId: number }) {
    const ref = collection(getFirestore(), 'reviews')
    const reviewQuery = query(ref, where('movieId', '==', props.movieId))
    const [querySnapshot] = useCollection(reviewQuery);
    const reviews = querySnapshot?.docs.map((doc) => doc.data());

    return (
        <>
            {reviews ? reviews.map((review) =>
                    <ReviewItem key={review.id} review={review as Review} />
                )
                : "No reviews yet"
            }
        </>
    );
}

export function ReviewItem(props: { review: Review }) {
    return (
        <Row className={"bg-light-gray text-black m-2 px-2 py-3 rounded"}>
            <Col>
                <Row>
                    <Col md={2}>
                        {/*TODO: show user's PFP, waiting for clem's push*/}
                        {/*<Image src={user?.photoURL} alt={"user"} height={30} width={30} className={"rounded"} />*/}
                        <h5>{props.review.userId}</h5>
                    </Col>
                    <Col className={"text-end"}>
                        <h5>
                            {props.review.score}/5
                        </h5>
                    </Col>
                    <Col md={"2"} className={"text-end"}>
                        <h5>{props.review.date.toDate().toDateString()}</h5>
                    </Col>
                </Row>
<p>
                    {props.review.text}
</p>
                <div className={"d-flex justify-content-end"}>
                    <Button>...</Button>

                </div>

            </Col>
        </Row>
    )
}