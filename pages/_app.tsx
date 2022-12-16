import type {AppProps} from 'next/app';
import OkNavbar from '../components/OkNavbar';
import {useUserData} from '../lib/hooks';
import {UserContext} from '../lib/context';
import {Container, SSRProvider} from "react-bootstrap";

import '../styles/main.scss';

export default function App({Component, pageProps}: AppProps) {
    const userData = useUserData();

    return (
        <SSRProvider>
            {/* @ts-ignore */}
            <UserContext.Provider value={userData}>
                <Container fluid className="bg-black" style={{height: "100vh"}}>
                    <OkNavbar />
                    <Component {...pageProps} />
                </Container>
            </UserContext.Provider>
        </SSRProvider>
    )
}
