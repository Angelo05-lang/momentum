import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  maxWidth: "600px",
  margin: "40px auto",
  padding: "20px",
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  fontFamily: "Arial, sans-serif",
  textAlign: "center",
};

const momentumTitle = {
  fontSize: "32px",
  marginBottom: "10px",
  color: "#333",
};

const userWelcome = {
  fontSize: "20px",
  marginBottom: "20px",
  color: "#555",
};

const quoteStyle = {
  fontStyle: "italic",
  color: "#777",
  marginBottom: "30px",
};

const buttonStyle = {
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  margin: "10px",
  backgroundColor: "#007bff",
  color: "#fff",
};

function Dashboard() {
  const [currentProfile, setCurrentProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const profile = localStorage.getItem("currentProfile");
    if (!profile) {
      navigate("/");
    } else {
      setCurrentProfile(JSON.parse(profile));
    }
  }, [navigate]);

  if (!currentProfile) {
    return <p style={{ textAlign: "center" }}>Caricamento...</p>;
  }

  return (
    <div style={containerStyle}>
      <h1 style={momentumTitle}>Momentum</h1>
      <h2 style={userWelcome}>Benvenuto, {currentProfile.name}</h2>
      <p style={quoteStyle}>
        "Pensa, agisci, e i tuoi formati non saranno in mille ma in molte le mani." - ChatGPT
      </p>

      <button style={buttonStyle} onClick={() => navigate("/dieta")}>
        Dieta
      </button>
      <button style={buttonStyle} onClick={() => navigate("/esercizi")}>
        Esercizi
      </button>
      <button style={buttonStyle} onClick={() => navigate("/circuito")}>
        Circuito
      </button>
      <button style={buttonStyle} onClick={() => navigate("/profile")}>
        Profilo
      </button>
    </div>
  );
}

export default Dashboard;
