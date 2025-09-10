import "../css/progressbar.css";
export default function ProgressBar({ progress, caps }) {

    return (
        <div>

            <div className="progress-bar">
                <progress value={progress} max="100" />
                <p className="progress-text">{progress}%</p>
                <div><p>{caps}</p> </div>
            </div>

        </div>
    );
}