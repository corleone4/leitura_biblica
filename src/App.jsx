import "./css/app.css";
import Navbar from "./components/Navbar";
import Book from "./components/Book";
import { data, filters } from "./data";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function App() {
  const [books, setBooks] = useState([]);
  const [progress, setProgress] = useState({});
  const [bookFilter, setBookFilter] = useState(() => {
    return localStorage.getItem("filter") || "pentateuco";
  });
  useEffect(() => {
    setBooks(data);
    const saved = JSON.parse(localStorage.getItem("progress")) || {};
    setProgress(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("filter", bookFilter);
  }, [bookFilter]);

  useEffect(() => {
    localStorage.setItem("progress", JSON.stringify(progress));
  }, [progress]);

  function handleBookFilter(filterName) {
    setBookFilter(filterName);
  }

  const markChapterAsRead = (bookName, chapter) => {
    setProgress((prev) => {
      const updated = { ...prev };
      if (!updated[bookName]) updated[bookName] = [];
      if (!updated[bookName].includes(chapter)) {
        updated[bookName].push(chapter);
      }
      return updated;
    });
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="button-list">
          {filters.map((filter) => (
            <button
              key={filter.group}
              onClick={() => handleBookFilter(filter.group)}
              className={bookFilter === filter.group ? "active" : ""}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="books-container">
          {books
            .filter(book => !bookFilter || book.group === bookFilter)
            .map((book) => {
              const readChapters = progress[book.id_name]?.length || 0;
              const total = book.chapters;
              const percent = Math.round((readChapters / total) * 100);
              const remainingChapters = total - readChapters;
              return (
                <div key={book.id_name}>
                  <Link to={`/${book.id_name}`}>
                    <Book
                      name={book.name}
                      progress={percent}
                      caps={remainingChapters}
                      onReadChapter={(cap) => markChapterAsRead(book.name, cap)}
                    />
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
