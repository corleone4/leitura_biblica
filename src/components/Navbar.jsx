import { useState } from "react";
import "../css/navbar.css"
import { NavLink } from "react-router";

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
                <NavLink to="/" className={`navbar-link ${isActive => isActive ? 'active' : ''}`}><button>Início</button></NavLink>
                <NavLink to="/metas" className={`navbar-link ${isActive => isActive ? 'active' : ''}`}><button>Metas</button></NavLink>
                <NavLink to="/ajustes" className={`navbar-link ${isActive => isActive ? 'active' : ''}`}><button>Ajustes</button></NavLink>
            </nav>
        </div>
    );
}