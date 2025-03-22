import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  maxWidth: "600px",
  margin: "50px auto",
  padding: "20px",
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  fontFamily: "Arial, sans-serif",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "24px",
  marginBottom: "20px",
  color: "#333",
};

const profileListStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
};

const profileItemStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#f9f9f9",
  borderRadius: "6px",
  padding: "12px 15px",
  marginBottom: "10px",
  border: "1px solid #e0e0e0",
  boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
  cursor: "pointer",
};

const profileInfoStyle = {
  fontSize: "15px",
  color: "#555",
};

const buttonGroupStyle = {
  display: "flex",
  gap: "8px",
};

const buttonStyle = {
  padding: "8px 16px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "14px",
};

const selectButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#007bff",
  color: "#fff",
};

const deleteButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#dc3545",
  color: "#fff",
};

const createButtonStyle = {
  display: "block",
  width: "100%",
  padding: "12px",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  marginTop: "20px",
};

// Stili per il form inline
const formContainerStyle = {
  marginTop: "20px",
  backgroundColor: "#f9f9f9",
  borderRadius: "6px",
  padding: "15px",
  border: "1px solid #e0e0e0",
};

const formRowStyle = {
  display: "flex",
  gap: "10px",
  marginBottom: "10px",
};

const labelStyle = {
  fontWeight: "bold",
  marginBottom: "5px",
  color: "#444",
};

const inputStyle = {
  flex: 1,
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const formButtonContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "10px",
};

const cancelButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#6c757d",
  color: "#fff",
};

const saveButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#007bff",
  color: "#fff",
};

function Home() {
  const navigate = useNavigate();

  // Profili iniziali (se vuoi partire vuoto, usa [])
  const [profiles, setProfiles] = useState(() => {
    const saved = localStorage.getItem("profiles");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, name: "Mario", age: 30, weight: 75, height: 175 },
          { id: 2, name: "Luigi", age: 25, weight: 70, height: 180 },
        ];
  });

  // Salva i profili ogni volta che cambiano
  useEffect(() => {
    localStorage.setItem("profiles", JSON.stringify(profiles));
  }, [profiles]);

  // Stato per mostrare o nascondere il form
  const [showForm, setShowForm] = useState(false);

  // Stato per i campi del nuovo profilo
  const [newProfile, setNewProfile] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
  });

  // Seleziona un profilo e vai alla Dashboard
  const handleSelect = (profile, e) => {
    // Se l'utente clicca sul rigo intero, potresti voler fare la selezione
    localStorage.setItem("currentProfile", JSON.stringify(profile));
    navigate("/dashboard");
  };

  // Elimina un profilo
  const handleDelete = (id, e) => {
    e.stopPropagation(); // Evita che il click selezioni il profilo
    setProfiles(profiles.filter((p) => p.id !== id));
  };

  // Mostra o nasconde il form
  const toggleForm = () => {
    setShowForm(!showForm);
    if (!showForm) {
      // Reset campi se stiamo aprendo il form
      setNewProfile({ name: "", age: "", weight: "", height: "" });
    }
  };

  // Salva il nuovo profilo
  const handleSaveProfile = () => {
    const { name, age, weight, height } = newProfile;
    if (!name || !age || !weight || !height) {
      alert("Compila tutti i campi!");
      return;
    }
    const profileToAdd = {
      id: Date.now(),
      name,
      age: Number(age),
      weight: Number(weight),
      height: Number(height),
    };
    setProfiles([...profiles, profileToAdd]);
    setShowForm(false);
  };

  // Annulla la creazione del profilo
  const handleCancel = () => {
    setShowForm(false);
    setNewProfile({ name: "", age: "", weight: "", height: "" });
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Seleziona un Profilo</h1>

      <ul style={profileListStyle}>
        {profiles.map((profile) => (
          <li
            key={profile.id}
            style={profileItemStyle}
            onClick={(e) => handleSelect(profile, e)}
          >
            <span style={profileInfoStyle}>
              {profile.name}, {profile.age}y, {profile.weight}kg, {profile.height}cm
            </span>
            <div style={buttonGroupStyle}>
              <button
                style={selectButtonStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(profile, e);
                }}
              >
                Seleziona
              </button>
              <button
                style={deleteButtonStyle}
                onClick={(e) => handleDelete(profile.id, e)}
              >
                Elimina
              </button>
            </div>
          </li>
        ))}
      </ul>

      {!showForm && (
        <button style={createButtonStyle} onClick={toggleForm}>
          + Crea Nuovo Profilo
        </button>
      )}

      {showForm && (
        <div style={formContainerStyle}>
          <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
            Crea un Nuovo Profilo
          </h2>
          <div style={formRowStyle}>
            <label style={labelStyle}>Nome</label>
            <input
              type="text"
              style={inputStyle}
              value={newProfile.name}
              onChange={(e) =>
                setNewProfile({ ...newProfile, name: e.target.value })
              }
            />
          </div>
          <div style={formRowStyle}>
            <label style={labelStyle}>Età</label>
            <input
              type="number"
              style={inputStyle}
              value={newProfile.age}
              onChange={(e) =>
                setNewProfile({ ...newProfile, age: e.target.value })
              }
            />
          </div>
          <div style={formRowStyle}>
            <label style={labelStyle}>Peso (kg)</label>
            <input
              type="number"
              style={inputStyle}
              value={newProfile.weight}
              onChange={(e) =>
                setNewProfile({ ...newProfile, weight: e.target.value })
              }
            />
          </div>
          <div style={formRowStyle}>
            <label style={labelStyle}>Altezza (cm)</label>
            <input
              type="number"
              style={inputStyle}
              value={newProfile.height}
              onChange={(e) =>
                setNewProfile({ ...newProfile, height: e.target.value })
              }
            />
          </div>
          <div style={formButtonContainerStyle}>
            <button style={cancelButtonStyle} onClick={handleCancel}>
              Annulla
            </button>
            <button style={saveButtonStyle} onClick={handleSaveProfile}>
              Crea Profilo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
