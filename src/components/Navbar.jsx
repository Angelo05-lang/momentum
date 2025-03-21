import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dieta">Dieta</Link></li>
        <li><Link to="/esercizi">Esercizi</Link></li>
        <li><Link to="/circuito">Circuito</Link></li>
        <li><Link to="/profile">Profilo</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
