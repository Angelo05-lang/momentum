import React, { useState } from "react";

const DietaAI = () => {
  const [obiettivo, setObiettivo] = useState("");
  const [restrizioni, setRestrizioni] = useState("");
  const [dietaGenerata, setDietaGenerata] = useState("");

  const generaDieta = () => {
    let dieta = "";
    // Scegli opzioni casuali in base all'obiettivo
    if (obiettivo.toLowerCase().includes("massa")) {
      const opzioni = [
        "Colazione: Pancake proteici con frutta; Pranzo: Pasta integrale con pollo e verdure; Cena: Riso con salmone e broccoli.",
        "Colazione: Uova strapazzate con pane integrale; Pranzo: Riso basmati con carne rossa magra; Cena: Insalata di quinoa e pollo.",
        "Colazione: Smoothie proteico con avena e banana; Pranzo: Pasta con sugo di pomodoro e tonno; Cena: Pesce al forno con verdure miste."
      ];
      dieta = opzioni[Math.floor(Math.random() * opzioni.length)];
    } else if (obiettivo.toLowerCase().includes("definizione")) {
      const opzioni = [
        "Colazione: Smoothie verde con spinaci e mela; Pranzo: Insalata di quinoa con tofu e verdure; Cena: Zuppa di legumi e verdure.",
        "Colazione: Yogurt magro con frutta fresca; Pranzo: Insalata mista con tonno e pomodorini; Cena: Verdure grigliate con petto di pollo.",
        "Colazione: Toast integrale con avocado e uovo; Pranzo: Minestrone di verdure; Cena: Pesce al vapore con broccoli."
      ];
      dieta = opzioni[Math.floor(Math.random() * opzioni.length)];
    } else {
      const opzioni = [
        "Colazione: Toast integrale con avocado; Pranzo: Insalata mista con legumi; Cena: Pollo alla griglia con verdure.",
        "Colazione: Cereali integrali con latte scremato; Pranzo: Zuppa di legumi; Cena: Pesce al forno con contorno di insalata.",
        "Colazione: Frutta fresca e yogurt naturale; Pranzo: Panino integrale con verdure; Cena: Pasta al pomodoro fresco."
      ];
      dieta = opzioni[Math.floor(Math.random() * opzioni.length)];
    }
    if (restrizioni.trim()) {
      dieta += ` Restrizioni: ${restrizioni.trim()}.`;
    }
    setDietaGenerata(dieta);
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "10px", marginBottom: "20px" }}>
      <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>Genera Dieta con AI</h2>
      <input
        type="text"
        placeholder="Obiettivo (massa, definizione, ecc.)"
        value={obiettivo}
        onChange={(e) => setObiettivo(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
      />
      <input
        type="text"
        placeholder="Restrizioni alimentari (se presenti)"
        value={restrizioni}
        onChange={(e) => setRestrizioni(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
      />
      <button
        onClick={generaDieta}
        style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px" }}
      >
        Genera Dieta
      </button>
      {dietaGenerata && (
        <div style={{ marginTop: "20px", fontSize: "16px" }}>
          <strong>Dieta Generata:</strong>
          <p>{dietaGenerata}</p>
        </div>
      )}
    </div>
  );
};

export default DietaAI;
