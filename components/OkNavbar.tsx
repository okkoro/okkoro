import {UserContext} from "../lib/context";
import {useContext} from "react";
import {Button, Navbar} from "react-bootstrap";
import Link from "next/link";

export default function OkNavbar() {
    const {user, username} = useContext(UserContext);

    return (
        <Navbar>
            {username && (
                <>
                    <Link href={`/${username}`}>
                        <Button>
                            ${username}
                            <img src={user?.photoURL}  alt={"user"}/>
                        </Button>
                    </Link>
                </>
            )}

            {!username && (
                <Link href={"/enter"}>
                    <Button>Log In</Button>
                </Link>
            )

            }
        </Navbar>
    )
}