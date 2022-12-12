import {useContext} from "react";
import {UserContext} from "../../lib/context";

export default function Page() {
    const { user, username } = useContext(UserContext);

    return (
        <div className="row bg-green">
            <div className="col text-center">
                <img src="okkoro.png" />
                <h1>Welcome {username}</h1>
            </div>
        </div>
    )
}