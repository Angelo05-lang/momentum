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
};

const titleStyle = {
  textAlign: "center",
  fontFamily: "Arial, sans-serif",
  color: "#333",
  marginBottom: "20px",
  fontSize: "24px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "16px",
  marginBottom: "10px",
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

const Dieta = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const storageKey = `dietPlan-${userId}`;

  const [userName, setUserName] = useState("");
  const [showAIDiet, setShowAIDiet] = useState(false);

  // Piano dietetico iniziale
  const initialPlan = {
    Monday: { breakfast: "", midMorning: "", lunch: "", afternoonSnack: "", dinner: "" },
    Tuesday: { breakfast: "", midMorning: "", lunch: "", afternoonSnack: "", dinner: "" },
    Wednesday: { breakfast: "", midMorning: "", lunch: "", afternoonSnack: "", dinner: "" },
    Thursday: { breakfast: "", midMorning: "", lunch: "", afternoonSnack: "", dinner: "" },
    Friday: { breakfast: "", midMorning: "", lunch: "", afternoonSnack: "", dinner: "" },
    Saturday: { breakfast: "", midMorning: "", lunch: "", afternoonSnack: "", dinner: "" },
    Sunday: { breakfast: "", midMorning: "", lunch: "", afternoonSnack: "", dinner: "" },
  };

  const [plan, setPlan] = useState(() => {
    const savedPlan = localStorage.getItem(storageKey);
    return savedPlan ? JSON.parse(savedPlan) : initialPlan;
  });

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      const users = JSON.parse(savedUsers);
      const currentUser = users.find(u => u.id === parseInt(userId, 10));
      if (currentUser) setUserName(currentUser.name);
    }
  }, [userId]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(plan));
  }, [plan, storageKey]);

  const handleChange = (day, meal, value) => {
    setPlan(prevPlan => ({
      ...prevPlan,
      [day]: {
        ...prevPlan[day],
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
      
      {/* Pulsante per attivare/disattivare l'AI Dieta */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button onClick={() => setShowAIDiet(!showAIDiet)} style={primaryButtonStyle}>
          {showAIDiet ? "Nascondi AI Dieta" : "AI Dieta"}
        </button>
      </div>
      
      {/* Sezione AI Dieta */}
      {showAIDiet && <DietaAI />}
      
      {/* Interfaccia della dieta (tabella) */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Giorno</th>
            <th style={thStyle}>Colazione</th>
            <th style={thStyle}>Spuntino Mattutino</th>
            <th style={thStyle}>Pranzo</th>
            <th style={thStyle}>Spuntino Pomeridiano</th>
            <th style={thStyle}>Cena</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(plan).map((day) => (
            <tr key={day}>
              <td style={tdStyle}>{day}</td>
              <td style={tdStyle}>
                <input
                  type="text"
                  value={plan[day].breakfast}
                  onChange={(e) => handleChange(day, "breakfast", e.target.value)}
                  placeholder="Inserisci colazione"
                  style={inputStyle}
                />
              </td>
              <td style={tdStyle}>
                <input
                  type="text"
                  value={plan[day].midMorning}
                  onChange={(e) => handleChange(day, "midMorning", e.target.value)}
                  placeholder="Inserisci spuntino mattutino"
                  style={inputStyle}
                />
              </td>
              <td style={tdStyle}>
                <input
                  type="text"
                  value={plan[day].lunch}
                  onChange={(e) => handleChange(day, "lunch", e.target.value)}
                  placeholder="Inserisci pranzo"
                  style={inputStyle}
                />
              </td>
              <td style={tdStyle}>
                <input
                  type="text"
                  value={plan[day].afternoonSnack}
                  onChange={(e) => handleChange(day, "afternoonSnack", e.target.value)}
                  placeholder="Inserisci spuntino pomeridiano"
                  style={inputStyle}
                />
              </td>
              <td style={tdStyle}>
                <input
                  type="text"
                  value={plan[day].dinner}
                  onChange={(e) => handleChange(day, "dinner", e.target.value)}
                  placeholder="Inserisci cena"
                  style={inputStyle}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dieta;
