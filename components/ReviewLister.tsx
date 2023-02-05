import {collection, query, where} from "@firebase/firestore";
import {getFirestore} from "firebase/firestore";
import {useCollection} from "react-firebase-hooks/firestore";
import {Col, Dropdown, Row} from "react-bootstrap";
import Script from "next/script";
import {useContext} from "react";
import {UserContext} from "../lib/context";


export function ReviewLister(props: { movieId: number }) {
    const ref = collection(getFirestore(), 'reviews')
    const reviewQuery = query(ref, where('movieId', '==', props.movieId))
    const [querySnapshot] = useCollection(reviewQuery);
    const reviews = querySnapshot?.docs.map((doc) => doc.data());

    // console.log("ReviewLister refresh")
    return (
        <>
            <Script src="https://kit.fontawesome.com/41b311bbbd.js" crossOrigin="anonymous" />
            {reviews && reviews.length > 0 ? reviews.map((review) =>
                    <ReviewItem key={review.userId} review={review as Review} />
                )
                : <div className={"text-white"}>No reviews yet</div>
            }
        </>
    );
}

export function ReviewItem(props: { review: Review }) {
    const {user, username} = useContext(UserContext);

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
                            {props.review.score}/10
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
                    <Dropdown>
                        <Dropdown.Toggle variant="" id="dropdown-basic">
                            <i className="fa-solid fa-ellipsis"></i>
                        </Dropdown.Toggle>

                        {/*TODO: Add functionality to these buttons*/}
                        <Dropdown.Menu>
                            {username == props.review.userId ? (<>
                                    <Dropdown.Item>Edit <i className="fa-solid fa-file"></i></Dropdown.Item>
                                    <Dropdown.Item>Delete <i className="fa-solid fa-trash"></i></Dropdown.Item>
                                </>)
                                : (<>
                                    <Dropdown.Item>Report <i className="fa-solid fa-flag"></i></Dropdown.Item>
                                </>)
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Col>
        </Row>
    )
}