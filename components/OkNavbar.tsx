import {UserContext} from "../lib/context";
import {useContext} from "react";
import {Button, Nav, Navbar, NavbarBrand} from "react-bootstrap";
import Link from "next/link";
import logo from "public/okkoro_banner.png";
import Image from "next/image";

export default function OkNavbar() {
    const {user, username, admin} = useContext(UserContext);

    return (
        <Navbar className={"border-bottom border-dark-gray sticky-top bg-black pe-1"}>
            <NavbarBrand>
                <Link href={"/"}>
                    <Image src={logo} alt={"okkoro logo"} height={30} />
                </Link>
            </NavbarBrand>

            <Nav className={"me-auto"}>
                <Link data-cy={"Movies-NavButton"} href={`/movies`} className={'text-decoration-none px-3 text-green border-start border-green'} style={{fontSize: "1.5rem"}}>
                    Movies
                </Link>
            </Nav>

            {(user && admin) && (<div data-cy={"Admin-NavIndicator"}>
                <i>admin</i>
                </div>) }

            <Nav className={"ms-2"}>
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