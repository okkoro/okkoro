import {UserContext} from "../lib/context";
import {useContext} from "react";
import {Button, Container, Nav, Navbar, NavbarBrand} from "react-bootstrap";
import Link from "next/link";
import logo from "public/okkoro_banner.png";
import Image from "next/image";
import {useTranslation} from "react-i18next";

import './../lib/i18n'
import i18n from "i18next";

const lngs: any = {
    "en": {nativeName: "EN"},
    "fr": {nativeName: "FR"}
}

export default function OkNavbar() {
    const {user, username, admin} = useContext(UserContext);

    const {t} = useTranslation();

    const switchLanguage = () => {
        if (i18n.resolvedLanguage === "en") {
            i18n.changeLanguage("fr")
        } else {
            i18n.changeLanguage("en")
        }
    };

    return (
        <Navbar expand="md" className={"border-bottom border-dark-gray sticky-top bg-black pe-1"}>
            <Container fluid>
                <NavbarBrand>
                    <Link href={"/"}>
                        <Image src={logo} alt={"okkoro logo"} height={30} />
                    </Link>
                </NavbarBrand>
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <div className={"btn-outline-light"} id="navToggleButton">
                        <i className="fa-solid fa-bars" style={{minWidth: "25px", fill: "#ffffff"}}></i>
                    </div>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className={"me-auto"}>
                        <Link data-cy={"Movies-NavButton"} href={`/movies`} className={'text-decoration-none px-3 text-green border-start border-green'} style={{fontSize: "1.5rem"}}>
                            {t("navbarMovies")}
                        </Link>
                    </Nav>

                    <div className={"ms-2 d-flex flex-row justify-content-end"} style={{gap:"1vh"}}>
                        {(user && admin) && (<div data-cy={"Admin-NavIndicator"}>
                            <i>admin</i>
                        </div>)}

                        <button className={"btn btn-outline-green"} style={{minWidth: "46px"}} onClick={switchLanguage}>
                            {i18n.resolvedLanguage === "en" ?
                                <>{lngs["en"].nativeName}</>
                                : <>{lngs["fr"].nativeName}</>
                            }
                        </button>


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
                                <Button>{t("navbarLogIn")}</Button>
                            </Link>
                        )}
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}