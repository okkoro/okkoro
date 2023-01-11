import {UserContext} from "../lib/context";
import {useContext} from "react";
import {Button, Nav, Navbar, NavbarBrand} from "react-bootstrap";
import Link from "next/link";
import logo from "public/okkoro_banner.png";
import Image from "next/image";

export default function OkNavbar() {
    const {user, username} = useContext(UserContext);

    return (
        <Navbar>
            <NavbarBrand>
                <Link href={"/"}>
                    <Image src={logo} alt={"okkoro logo"} height={30}/>
                </Link>
            </NavbarBrand>

            <Nav>
                {username && (
                    <Link href={`/users/${username}`}>
                        <Button>
                            {username} &nbsp;
                            {/* @ts-ignore */}
                            <Image src={user?.photoURL} alt={"user"} height={30} width={30} className={"rounded"} />
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