import ChaptersInfo from "../components/ChaptersInfo";
import Navbar from "../components/Navbar";

export default function Metas() {
    return (
        <>
            <Navbar />
            <div className="container">
                Metas
                <ChaptersInfo/>
            </div>

        </>
    );
}