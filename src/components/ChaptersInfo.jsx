import { useEffect, useState } from "react";
import { Target, CheckCircle } from "lucide-react";

export default function ChaptersInfo() {
    const totalChapters = 1189;

    const [selectedDay, setSelectedDay] = useState(() => {
        return localStorage.getItem("date") || "";
    });

    const [chapters, setChapters] = useState(() => {
        return JSON.parse(localStorage.getItem("chapters")) || 1;
    });

    const [chaptersNeeded, setChaptersNeeded] = useState(0);
    const [finishDate, setFinishDate] = useState("");
    const [remainingChapters, setRemainingChapters] = useState(totalChapters);

    useEffect(() => {
        localStorage.setItem("chapters", JSON.stringify(chapters));
        localStorage.setItem("date", selectedDay);
    }, [chapters, selectedDay]);

    useEffect(() => {
        function calcRemaining() {
            const progress = JSON.parse(localStorage.getItem("progress")) || {};
            const readChapters = Object.values(progress).reduce(
                (acc, chapters) => acc + chapters.length,
                0
            );
            setRemainingChapters(totalChapters - readChapters);
        }
        calcRemaining();
        window.addEventListener("storage", calcRemaining);
        return () => window.removeEventListener("storage", calcRemaining);
    }, []);

    function handleSelectedDay(e) {
        const value = e.target.value;
        setSelectedDay(value);
        calculateByDate(value);
    }

    function handleDayChange(e) {
        const chaptersPerDay = parseInt(e.target.value, 10);
        setChapters(chaptersPerDay);
        calculateByChapters(chaptersPerDay);
    }

    function calculateByDate(value) {
        if (!value) return;

        const [year, month, day] = value.split("-");
        const localDate = new Date(Number(year), Number(month) - 1, Number(day), 12, 0, 0);

        const today = new Date();
        const diffTime = localDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 0) {
            setChaptersNeeded(0);
            return;
        }

        const chaptersToRead = Math.ceil(remainingChapters / diffDays);
        setChaptersNeeded(chaptersToRead);
    }

    function calculateByChapters(chaptersPerDay) {
        if (!chaptersPerDay || chaptersPerDay <= 0) return;

        const neededDays = Math.ceil(remainingChapters / chaptersPerDay);
        const today = new Date();
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + neededDays);

        const formattedDate = futureDate.toLocaleDateString("pt-BR");
        setFinishDate(formattedDate);
    }

    function handleDateFormat(value) {
        if (!value) return "";

        const [year, month, day] = value.split("-");
        return `${day}/${month}/${year}`;
    }


    useEffect(() => {
        if (chapters) calculateByChapters(chapters);
        if (selectedDay) calculateByDate(selectedDay);
    }, [chapters, selectedDay, remainingChapters]);

    return (
        <div className="chapters-card">
            <h2 className="title">Plano de Leitura</h2>

            <div className="form-section">
                <label> Capítulos por dia</label>
                <input
                    type="number"
                    min="1"
                    value={chapters}
                    onChange={handleDayChange}
                />

                <label>Data Meta</label>
                <input
                    type="date"
                    value={selectedDay} // salva como texto ISO
                    onChange={handleSelectedDay}
                />
            </div>

            <div className="result">
                {finishDate ? (
                    <p>
                        <CheckCircle
                            size={18}
                            style={{ color: "green", marginRight: "6px", verticalAlign: "middle" }}
                        />
                        <span>
                            Ao ler <strong>{chapters}</strong> capítulo(s) por dia, você terminará em{" "}
                            <strong>{finishDate}</strong>.
                        </span>
                    </p>
                ) : (
                    <p> Insira uma quantidade de capítulos...</p>
                )}
            </div>

            <div className="result">
                {selectedDay && chaptersNeeded > 0 && (
                    <p>
                        <Target
                            size={18}
                            style={{ color: "#3498db", marginRight: "6px", verticalAlign: "middle" }}
                        />
                        <span>
                            Para concluir até <strong>{handleDateFormat(selectedDay)}</strong>, precisa ler{" "}
                            <strong>{chaptersNeeded}</strong> capítulo(s) por dia.
                        </span>
                    </p>
                )}
            </div>
        </div>
    );
}
