import ProgressBar from "./ProgressBar";

export default function Book({ name, progress, caps }) {
    return (
       
            <div className="book">
                <span className="book-title">{name}</span>
                <ProgressBar progress={progress} caps={caps} />
            </div>
            )
}