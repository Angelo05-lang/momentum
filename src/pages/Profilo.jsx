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

const labelStyle = {
  fontWeight: "bold",
  marginRight: "10px",
};

const inputStyle = {
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "16px",
  margin: "5px 0",
};

const buttonStyle = {
  padding: "10px 20px",
  margin: "10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

const saveButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#28a745",
  color: "#fff",
};

const cancelButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#dc3545",
  color: "#fff",
};

const editButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#007bff",
  color: "#fff",
};

const Profilo = () => {
  const navigate = useNavigate();
  const [currentProfile, setCurrentProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem("currentProfile");
    if (!savedProfile) {
      navigate("/");
    } else {
      const profile = JSON.parse(savedProfile);
      setCurrentProfile(profile);
      setEditedProfile(profile);
    }
  }, [navigate]);

  const handleChange = (field, value) => {
    setEditedProfile({
      ...editedProfile,
      [field]: value,
    });
  };

  const handleSave = () => {
    // Salva il profilo modificato in localStorage e aggiorna lo stato
    localStorage.setItem("currentProfile", JSON.stringify(editedProfile));
    setCurrentProfile(editedProfile);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditedProfile(currentProfile);
    setEditMode(false);
  };

  if (!currentProfile) {
    return <p>Caricamento...</p>;
  }

  return (
    <div style={containerStyle}>
      <h1>Profilo Utente</h1>
      {editMode ? (
        <div>
          <p>
            <label style={labelStyle}>Nome:</label>
            <input
              type="text"
              value={editedProfile.name}
              onChange={(e) => handleChange("name", e.target.value)}
              style={inputStyle}
            />
          </p>
          <p>
            <label style={labelStyle}>Età:</label>
            <input
              type="number"
              value={editedProfile.age}
              onChange={(e) => handleChange("age", e.target.value)}
              style={inputStyle}
            />
          </p>
          <p>
            <label style={labelStyle}>Peso (kg):</label>
            <input
              type="number"
              value={editedProfile.weight}
              onChange={(e) => handleChange("weight", e.target.value)}
              style={inputStyle}
            />
          </p>
          <p>
            <label style={labelStyle}>Altezza (cm):</label>
            <input
              type="number"
              value={editedProfile.height}
              onChange={(e) => handleChange("height", e.target.value)}
              style={inputStyle}
            />
          </p>
          <p>
            <label style={labelStyle}>Obiettivo:</label>
            <input
              type="text"
              value={editedProfile.goal}
              onChange={(e) => handleChange("goal", e.target.value)}
              style={inputStyle}
            />
          </p>
          <button onClick={handleSave} style={saveButtonStyle}>
            Salva
          </button>
          <button onClick={handleCancel} style={cancelButtonStyle}>
            Annulla
          </button>
        </div>
      ) : (
        <div>
          <p>
            <strong>Nome:</strong> {currentProfile.name}
          </p>
          <p>
            <strong>Età:</strong> {currentProfile.age} anni
          </p>
          <p>
            <strong>Peso:</strong> {currentProfile.weight} kg
          </p>
          <p>
            <strong>Altezza:</strong> {currentProfile.height} cm
          </p>
          <p>
            <strong>Obiettivo:</strong> {currentProfile.goal}
          </p>
          <button onClick={() => setEditMode(true)} style={editButtonStyle}>
            Modifica
          </button>
        </div>
      )}
      <button
        onClick={() => navigate("/dashboard")}
        style={{ ...buttonStyle, backgroundColor: "#007bff", color: "#fff" }}
      >
        Torna alla Dashboard
      </button>
    </div>
  );
};

export default Profilo;
