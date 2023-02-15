import type {AppProps} from 'next/app';
import OkNavbar from '../components/OkNavbar';
import {useUserData} from '../lib/hooks';
import {UserContext} from '../lib/context';
import {Container, SSRProvider} from "react-bootstrap";

import '../styles/main.scss';
import {Toaster} from "react-hot-toast";

import './../lib/i18n'
import {useTranslation} from "react-i18next";

const lngs: any = {
    "en": { nativeName: "English"},
    "fr": {nativeName: "Français"}
}
export default function App({Component, pageProps}: AppProps) {
    const userData = useUserData();
    const {t, i18n} = useTranslation();

    return (
        <SSRProvider>
            {/* @ts-ignore */}
            <UserContext.Provider value={userData}>
                <Container fluid className={"bg-black text-light-gray main"} style={{minHeight: "100vh"}}>
                    <div>
                        {Object.keys(lngs).map((lng) => (
                            <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
                                {lngs[lng].nativeName}
                            </button>
                        ))}
                    </div>
                    <OkNavbar />
                    <Component {...pageProps} />
                    <Toaster />
                </Container>
            </UserContext.Provider>
        </SSRProvider>
    )
}
