import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Stile unificato per i pulsanti
const buttonStyle = {
  padding: "10px 20px",
  margin: "10px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#007bff",
  color: "white",
  cursor: "pointer",
  fontSize: "16px",
  minWidth: "120px"
};

function Profilo() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const numericUserId = parseInt(userId, 10);
  
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  
  // Stati per il form di editing
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  // Carica i dati dell'utente dal localStorage
  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      const usersArray = JSON.parse(savedUsers);
      const foundUser = usersArray.find(u => u.id === numericUserId);
      if (foundUser) {
        setUser(foundUser);
        setName(foundUser.name);
        setAge(foundUser.age);
        setWeight(foundUser.weight);
        setHeight(foundUser.height);
      }
    }
  }, [numericUserId]);

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name,
      age: parseInt(age, 10),
      weight: parseFloat(weight),
      height: parseFloat(height)
    };

    // Aggiorna l'utente nell'array salvato nel localStorage
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      const usersArray = JSON.parse(savedUsers);
      const updatedUsers = usersArray.map(u =>
        u.id === numericUserId ? updatedUser : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
    setUser(updatedUser);
    setEditMode(false);
  };

  if (!user) {
    return <div>Utente non trovato</div>;
  }

  return (
    <div>
      {/* Pulsante "Indietro" stilizzato */}
      <button onClick={() => navigate(-1)} style={buttonStyle}>
        Indietro
      </button>
      
      <h2>Profilo di {user.name}</h2>
      {editMode ? (
        <div>
          <div>
            <label>Nome: </label>
            <input 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
          <div>
            <label>Età: </label>
            <input 
              type="number" 
              value={age} 
              onChange={(e) => setAge(e.target.value)} 
            />
          </div>
          <div>
            <label>Peso (kg): </label>
            <input 
              type="number" 
              value={weight} 
              onChange={(e) => setWeight(e.target.value)} 
            />
          </div>
          <div>
            <label>Altezza (cm): </label>
            <input 
              type="number" 
              value={height} 
              onChange={(e) => setHeight(e.target.value)} 
            />
          </div>
          <button onClick={handleSave} style={buttonStyle}>Salva</button>
          <button 
            onClick={() => setEditMode(false)} 
            style={{ ...buttonStyle, backgroundColor: "#6c757d" }}
          >
            Annulla
          </button>
        </div>
      ) : (
        <div>
          <p><strong>Nome:</strong> {user.name}</p>
          <p><strong>Età:</strong> {user.age} anni</p>
          <p><strong>Peso:</strong> {user.weight} kg</p>
          <p><strong>Altezza:</strong> {user.height} cm</p>
          <button onClick={() => setEditMode(true)} style={buttonStyle}>
            Modifica
          </button>
        </div>
      )}
    </div>
  );
}

export default Profilo;
