// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import Dieta from "./pages/Dieta";
import Esercizi from "./pages/Esercizi";
import Circuito from "./pages/Circuito";
import Profilo from "./pages/Profilo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/:userId/*" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="dieta" element={<Dieta />} />
          <Route path="esercizi" element={<Esercizi />} />
          <Route path="circuito" element={<Circuito />} />
          <Route path="profilo" element={<Profilo />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
