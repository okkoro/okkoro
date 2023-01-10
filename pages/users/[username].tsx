import {useContext} from "react";
import {UserContext} from "../../lib/context";
import banner from "public/okkoro_banner.png";
import Image from 'next/image'

export default function Profile() {
    const { user, username } = useContext(UserContext);



    return (
        <div className="row bg-green">
            <div className="col text-center">
                <Image src={banner.src} alt="okkoro banner" width={banner.width} height={banner.height}/>
                <h1>Welcome {username}</h1>
            </div>
        </div>
    )
}