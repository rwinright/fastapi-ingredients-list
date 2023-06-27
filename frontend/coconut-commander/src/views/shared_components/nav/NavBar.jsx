import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    return (
        <div className="NavBar">
            <div className="title">
                <h3><a href="/">Coconut Commander</a></h3>
            </div>
            <div className={`hamburger-menu ${menuOpen ? "slide-left" : "slide-right"}`} onClick={() => setMenuOpen(!menuOpen)}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
            {menuOpen && <div className="nav-links">
                <div className="nav-link" onClick={() => setMenuOpen(false)}>
                    <Link to="/">Home</Link>
                </div>
                <div className="nav-link" onClick={() => setMenuOpen(false)}>
                    <Link to="/food">Food</Link>
                </div>
                <div className="nav-link" onClick={() => setMenuOpen(false)}>
                    <Link to="/todos">Todos</Link>
                </div>
            </div>}
        </div>
    )
}

export default NavBar