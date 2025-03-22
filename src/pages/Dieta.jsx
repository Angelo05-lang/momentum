import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DietaAI from "../components/DietaAI";

const containerStyle = {
  maxWidth: "800px",
  margin: "40px auto",
  padding: "20px",
  backgroundColor: "#fdfdfd",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  fontFamily: "Arial, sans-serif",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "24px",
  marginBottom: "20px",
  color: "#333",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "16px",
  marginBottom: "10px",
};

const selectStyle = {
  ...inputStyle,
  width: "200px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
};

const thStyle = {
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "10px",
  textAlign: "left",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "left",
};

const buttonStyle = {
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  minWidth: "120px",
  marginRight: "10px",
};

const primaryButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#007bff",
  color: "#fff",
};

const daysOfWeek = [
  "Lunedì",
  "Martedì",
  "Mercoledì",
  "Giovedì",
  "Venerdì",
  "Sabato",
  "Domenica",
];

const initialPlan = {
  "Lunedì": { breakfast: "", midMorning: "", lunch: "", afternoonSnack: "", dinner: "" },
  "Martedì": { breakfast: "", midMorning: "", lunch: "", afternoonSnack: "", dinner: "" },
  "Mercoledì": { breakfast: "", midMorning: "", lunch: "", afternoonSnack: "", dinner: "" },
  "Giovedì": { breakfast: "", midMorning: "", lunch: "", afternoonSnack: "", dinner: "" },
  "Venerdì": { breakfast: "", midMorning: "", lunch: "", afternoonSnack: "", dinner: "" },
  "Sabato": { breakfast: "", midMorning: "", lunch: "", afternoonSnack: "", dinner: "" },
  "Domenica": { breakfast: "", midMorning: "", lunch: "", afternoonSnack: "", dinner: "" },
};

function Dieta() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const storageKey = `dietPlan-${userId}`;

  const [userName, setUserName] = useState("");
  const [plan, setPlan] = useState(() => {
    const savedPlan = localStorage.getItem(storageKey);
    return savedPlan ? JSON.parse(savedPlan) : initialPlan;
  });
  const [selectedDay, setSelectedDay] = useState(daysOfWeek[0]);

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      const users = JSON.parse(savedUsers);
      const currentUser = users.find((u) => u.id === parseInt(userId, 10));
      if (currentUser) setUserName(currentUser.name);
    }
  }, [userId]);

  useEffect(() => {
    // Assicurati che per ogni giorno esista un piano; in caso contrario usa l'initialPlan
    const mergedPlan = { ...initialPlan, ...plan };
    setPlan(mergedPlan);
    localStorage.setItem(storageKey, JSON.stringify(mergedPlan));
  }, [plan, storageKey]);

  // Se il piano per il giorno selezionato non esiste, usa un default
  const currentDayPlan = plan[selectedDay] || { breakfast: "", midMorning: "", lunch: "", afternoonSnack: "", dinner: "" };

  // Aggiorna il piano per il giorno selezionato
  const handleChange = (meal, value) => {
    setPlan(prevPlan => ({
      ...prevPlan,
      [selectedDay]: {
        ...currentDayPlan,
        [meal]: value,
      },
    }));
  };

  return (
    <div style={containerStyle}>
      <button onClick={() => navigate(-1)} style={primaryButtonStyle}>
        Indietro
      </button>
      <h2 style={titleStyle}>
        {userName ? `Piano Dietetico per ${userName}` : `Piano Dietetico per Utente ${userId}`}
      </h2>
      {/* Componente AI Dieta */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <DietaAI />
      </div>
      {/* Selettore per il giorno */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <label style={{ fontWeight: "bold", marginRight: "10px" }}>
          Seleziona giorno:
        </label>
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          style={selectStyle}
        >
          {daysOfWeek.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>
      {/* Tabella del piano per il giorno selezionato */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Colazione</th>
            <th style={thStyle}>Spuntino Mattutino</th>
            <th style={thStyle}>Pranzo</th>
            <th style={thStyle}>Spuntino Pomeridiano</th>
            <th style={thStyle}>Cena</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>
              <input
                type="text"
                value={currentDayPlan.breakfast}
                onChange={(e) => handleChange("breakfast", e.target.value)}
                placeholder="Inserisci colazione"
                style={inputStyle}
              />
            </td>
            <td style={tdStyle}>
              <input
                type="text"
                value={currentDayPlan.midMorning}
                onChange={(e) => handleChange("midMorning", e.target.value)}
                placeholder="Inserisci spuntino mattutino"
                style={inputStyle}
              />
            </td>
            <td style={tdStyle}>
              <input
                type="text"
                value={currentDayPlan.lunch}
                onChange={(e) => handleChange("lunch", e.target.value)}
                placeholder="Inserisci pranzo"
                style={inputStyle}
              />
            </td>
            <td style={tdStyle}>
              <input
                type="text"
                value={currentDayPlan.afternoonSnack}
                onChange={(e) => handleChange("afternoonSnack", e.target.value)}
                placeholder="Inserisci spuntino pomeridiano"
                style={inputStyle}
              />
            </td>
            <td style={tdStyle}>
              <input
                type="text"
                value={currentDayPlan.dinner}
                onChange={(e) => handleChange("dinner", e.target.value)}
                placeholder="Inserisci cena"
                style={inputStyle}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Dieta;
