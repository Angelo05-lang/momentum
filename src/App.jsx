import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Dieta from "./pages/Dieta";
import Esercizi from "./pages/Esercizi";
import Circuito from "./pages/Circuito";
import Profilo from "./pages/Profilo";
import WorkoutPlan from "./pages/WorkoutPlan";  // Importa il nuovo componente

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dieta" element={<Dieta />} />
        <Route path="/esercizi" element={<Esercizi />} />
        <Route path="/circuito" element={<Circuito />} />
        <Route path="/profile" element={<Profilo />} />
        <Route path="/workout" element={<WorkoutPlan />} />  {/* Nuova rotta */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
