import { useParams } from "react-router";
import { data } from "../data.js";
import Navbar from "../components/Navbar.jsx";
import { useState, useEffect } from "react";

export default function BookChapters() {
    const { idName } = useParams();
    const selectedBook = data.find((selBook) => selBook.id_name === idName);
    const [selectedChapters, setSelectedChapters] = useState([]);
    // Carregar os capítulos já lidos do localStorage
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("progress")) || {};
        if (saved[idName]) {
            setSelectedChapters(saved[idName]);
        }
    }, [idName]);

    // Salvar os capítulos lidos no localStorage
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("progress")) || {};
        saved[idName] = selectedChapters;
        localStorage.setItem("progress", JSON.stringify(saved));
        // console.log(saved);
    }, [selectedChapters, idName]);

    function handleSelection(chapterNumber) {
        setSelectedChapters(prev => {
            let updated;
            if (prev.includes(chapterNumber)) {
                updated = prev.filter(num => num !== chapterNumber);
            } else {
                updated = [...prev, chapterNumber];
            }
            // Ordena os capítulos
            return updated.sort((a, b) => a - b);
        });

    }


    if (!selectedBook) {
        return <div>Livro não encontrado!</div>;
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <h2>{selectedBook.name}</h2>
                <p>Grupo: {selectedBook.group}</p>
                <p>Total de capítulos: {selectedBook.chapters}</p>

                <div className="chapters-container">
                    {Array.from({ length: selectedBook.chapters }, (_, i) => {
                        const chapterNumber = i + 1;
                        const isSelected = selectedChapters.includes(chapterNumber);

                        return (
                            <div
                                key={chapterNumber}
                                onClick={() => handleSelection(chapterNumber)}
                                className={`chapter-select ${isSelected ? "selected" : ""}`}
                            >
                                {chapterNumber}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
