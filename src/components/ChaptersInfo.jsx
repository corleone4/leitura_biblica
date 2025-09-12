import { useEffect, useState } from "react";

export default function ChaptersInfo() {
    const [selectedDay, setSelectedDay] = useState(() => {
        return JSON.parse(localStorage.getItem("date")) || "";
    });
    const [chapters, setChapters] = useState(() => {
        return JSON.parse(localStorage.getItem("chapters")) || 1;
    });
    const totalChapters = 1189;
    const [chaptersNeeded, setChaptersNeeded] = useState(0);
    const [finishDate, setFinishDate] = useState("");
    const [remainingChapters, setRemainingChapters] = useState(totalChapters);

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
        const value = e.target.value; // yyyy-mm-dd
        calculateByDate(value);
    }

    function handleDayChange(e) {
        const chaptersPerDay = parseInt(e.target.value, 10);
        calculateByChapters(chaptersPerDay);
    }

    function calculateByDate(value) {
        if (!value) return;

        const [year, month, day] = value.split("-");
        const localDate = new Date(year, month - 1, day);

        const formatted = localDate.toLocaleDateString("pt-BR"); // dd/mm/yyyy
        setSelectedDay(formatted);

        const today = new Date();
        const diffTime = localDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 0) {
            console.warn("Data escolhida está no passado ou é hoje.");
            return;
        }

        const chaptersToRead = Math.ceil(totalChapters / diffDays);
        setChaptersNeeded(chaptersToRead);
    }

    function toInputDateFormat(dateStr) {
        if (!dateStr) return "";
        const [day, month, year] = dateStr.split("/");
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }


    function calculateByChapters(chaptersPerDay) {
        if (!chaptersPerDay || chaptersPerDay <= 0) return;

        setChapters(chaptersPerDay);

        const neededDays = Math.ceil(remainingChapters / chaptersPerDay);
        const today = new Date();
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + neededDays);

        const formattedDate = futureDate.toLocaleDateString("pt-BR");
        setFinishDate(formattedDate);
    }

    useEffect(() => {
        if (chapters) {
            calculateByChapters(chapters);
        }
        if (selectedDay) {
            const parts = selectedDay.split("/");
            if (parts.length === 3) {
                const [day, month, year] = parts;
                const isoDate = `${year}-${month}-${day}`;
                calculateByDate(isoDate);
            }
        }
    });

    // mantém os valores salvos
    useEffect(() => {
        localStorage.setItem("chapters", JSON.stringify(chapters));
        localStorage.setItem("date", JSON.stringify(selectedDay));
    }, [chapters, selectedDay]);

    return (
        <>
            <div>
                <p>
                    Informe a quantidade de capítulos que você vai ler por dia e a data
                    desejada para finalizar a leitura.
                </p>
                <label>Capítulos por dia</label>
                <input
                    type="number"
                    value={chapters}
                    onChange={handleDayChange}
                />
                <br />
                <label> Data Meta </label>
                <input type="date" value={toInputDateFormat(selectedDay)} onChange={handleSelectedDay} />
            </div>

            <div>
                {finishDate ? (
                    <p>
                        Ao ler {chapters} capítulo(s) por dia, você terminará a leitura da
                        Bíblia em <strong>{finishDate}</strong>.
                    </p>
                ) : (
                    <p>Insira uma quantidade de capítulos...</p>
                )}
            </div>
            <div>
                {selectedDay && chaptersNeeded > 0 && (
                    <p>
                        Para ler a Bíblia toda até <strong>{selectedDay}</strong>, você
                        precisa ler {chaptersNeeded} capítulo(s) por dia.
                    </p>
                )}
            </div>
        </>
    );
}
