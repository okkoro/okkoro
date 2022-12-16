import {UserContext} from "../lib/context";
import {useContext} from "react";
import {Button, Nav, Navbar, NavbarBrand} from "react-bootstrap";
import Link from "next/link";

export default function OkNavbar() {
    const {user, username} = useContext(UserContext);

    return (
        <Navbar>
            <NavbarBrand>
                <Link href={"."}>
                    <img src={"okkoro_banner.png"}  height={"35rem"} />
                </Link>
            </NavbarBrand>

            <Nav>
                {username && (
                    <Link href={`/${username}`}>
                        <Button>
                            {username} &nbsp;
                            {/* @ts-ignore */}
                            <img src={user?.photoURL} alt={"user"} height={"35rem"} className={"rounded"} />
                        </Button>
                    </Link>
                )}

                {!username && (
                    <Link href={"/enter"}>
                        <Button>Log In</Button>
                    </Link>
                )}
            </Nav>

        </Navbar>
    )
}