import "./css/app.css";
import Navbar from "./components/Navbar";
import ProgressBar from "./components/ProgressBar";
import Book from "./components/Book";
import { biblia_pentateuco } from "./data/data";
// import { useState } from "react";
export default function App() {

  // const [biblia, setBiblia] = useState(1189);



  return (
    <>
      <Navbar />
      <div className="container">
        {biblia_pentateuco.map((livro) =>
        (
          <div>
            <Book name={livro.name} progress={100} caps={livro.chapters} />
          </div>
        ))}

        {/* <Book name="2 Pedro" progress={12} caps={3} /> */}
      </div>

    </>
  )
}
