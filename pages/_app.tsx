import type {AppProps} from 'next/app';
import OkNavbar from '../components/OkNavbar';
import {useUserData} from '../lib/hooks';
import {UserContext} from '../lib/context';
import {Container, SSRProvider} from "react-bootstrap";

import '../styles/main.scss';
import {Toaster} from "react-hot-toast";

export default function App({Component, pageProps}: AppProps) {
    const userData = useUserData();

    return (
        <SSRProvider>
            {/* @ts-ignore */}
            <UserContext.Provider value={userData}>
                <Container fluid className={"bg-black text-light-gray main"} style={{minHeight: "100vh"}}>
                    <OkNavbar />
                    <Component {...pageProps} />
                    <Toaster />
                </Container>
            </UserContext.Provider>
        </SSRProvider>
    )
}
