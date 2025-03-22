import React from "react";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  maxWidth: "600px",
  margin: "40px auto",
  padding: "20px",
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  fontFamily: "Arial, sans-serif",
  textAlign: "center",
};

const titleStyle = {
  fontSize: "24px",
  marginBottom: "20px",
  color: "#333",
};

const buttonStyle = {
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  backgroundColor: "#007bff",
  color: "#fff",
};

const WorkoutPlan = () => {
  const navigate = useNavigate();

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Scheda Allenamento</h2>
      <p>Seleziona un giorno per visualizzare e modificare gli esercizi assegnati.</p>
      <button style={buttonStyle} onClick={() => navigate(-1)}>
        Torna indietro
      </button>
    </div>
  );
};

export default WorkoutPlan;
