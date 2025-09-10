import { useState } from "react";
import "../css/navbar.css"

export default function Navbar() {

    const [openNav, setOpenNav] = useState(false);

    function handleOpenNav() {
        setOpenNav(prevState => !prevState);
    }


    return (
        <div className="navbar">
            <div className="navbar-link fix">
                <b>Leitura Bíblica</b>
            </div>
            <div className="navbar_link navbar-link-toggle fix" onClick={handleOpenNav}>
                {openNav ? "☰" : "☰"}

            </div>
            <nav className={`navbar-items-center ${openNav ? "navbar-toggle-show navbar-items-right" : ""}`}>
                <div className="navbar-link"><button>Início</button></div>
                <div className="navbar-link"><button>Metas</button></div>
                <div className="navbar-link"><button>Ajustes</button></div>
            </nav>
        </div>
    );
}