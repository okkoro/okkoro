import {useRouter} from "next/router";

export default function MovieDetails() {
    const {movie} = useRouter().query;

    return (
        <div className="row bg-green">
            <div className="col text-center">
                <h1></h1>
            </div>
        </div>
    )
}