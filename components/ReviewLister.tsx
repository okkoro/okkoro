import {collection, query, where} from "@firebase/firestore";
import {getFirestore} from "firebase/firestore";
import {useCollection} from "react-firebase-hooks/firestore";
import {Col, Dropdown, Row, Modal, Form, Button} from "react-bootstrap";
import Script from "next/script";
import {useContext, useState} from "react";
import {UserContext} from "../lib/context";
import {submitReport} from "../lib/firebase";
import toast from "react-hot-toast";


export function ReviewLister(props: { movieId: number }) {
    const ref = collection(getFirestore(), 'reviews')
    const reviewQuery = query(ref, where('movieId', '==', props.movieId))
    const [querySnapshot] = useCollection(reviewQuery);
    const reviews = querySnapshot?.docs.map((doc) => doc.data());

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
    const { username, admin} = useContext(UserContext);

    const [showReason, setShowReason] = useState(false)

    function showReasonModal(){
        setShowReason(true)
    }

    function hideReasonModal(){
        setShowReason(false)
    }

    function submit(event: any){
        event.preventDefault()
        submitReport(props.review, event.target.text.value)
        setShowReason(false)
        toast.success("Report Submitted To Be Reviewed");
    }

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
                        {props.review.date ? <h5>{props.review.date.toDate().toDateString()}</h5> : props.review.date}
                    </Col>
                </Row>
                <p>
                    {props.review.text}
                </p>

                <div className={"d-flex justify-content-end"}>
                    <Dropdown data-cy={"Reviews-Dropdown"}>
                        <Dropdown.Toggle variant="" id="dropdown-basic">
                            <i className="fa-solid fa-ellipsis"></i>
                        </Dropdown.Toggle>

                        {/*TODO: Add functionality to these buttons*/}
                        <Dropdown.Menu>
                            {admin &&
                                <Dropdown.Item data-cy={"Reviews-Dropdown-AdminDelete"}>Admin Delete <i className="fa-solid fa-trash"></i></Dropdown.Item>
                            }
                            {username == props.review.userId ? (<>
                                    <Dropdown.Item>Edit <i className="fa-solid fa-file"></i></Dropdown.Item>
                                    <Dropdown.Item>Delete <i className="fa-solid fa-trash"></i></Dropdown.Item>
                                </>)
                                : (<>
                                    <Dropdown.Item as="button" onClick={showReasonModal}>Report <i className="fa-solid fa-flag"></i>
                                        <ReportModal show={showReason} handleClose={hideReasonModal} handleSubmit={submit}/>
                                    </Dropdown.Item>
                                </>)
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Col>
        </Row>
    )
}

export function ReportModal(props: {show:boolean,handleClose: () => void, handleSubmit: (event: any)=>void}) {


    return (
        <div onClick={e => e.stopPropagation()}>
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Report Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={props.handleSubmit} id={"reportForm"}>
                    <Form.Group>
                        <Form.Label>Reason For Report:</Form.Label>
                        <Form.Control required id={"text"} name={"text"} as={"textarea"} rows={5} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"danger"} className={"rounded-pill text-black"} type={"submit"} form={"reportForm"}>
                    Submit Review
                </Button>
            </Modal.Footer>
        </Modal>
        </div>
    )
}