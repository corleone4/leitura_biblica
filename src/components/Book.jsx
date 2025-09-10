import ProgressBar from "./ProgressBar";

export default function Book({ name, progress, caps }) {
    return (
       
            <div class="book">
                <span class="book-title">{name}</span>
                <ProgressBar progress={progress} caps={caps} />
            </div>
            )
}