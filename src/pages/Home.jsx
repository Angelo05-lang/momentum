import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  maxWidth: "600px",
  margin: "40px auto",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#f9f9f9"
};

const profileCardStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px",
  borderBottom: "1px solid #eee"
};

const profileInfoStyle = {
  flex: "1"
};

const buttonStyle = {
  padding: "8px 12px",
  margin: "0 5px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#007bff",
  color: "white",
  cursor: "pointer",
  fontSize: "16px"
};

const deleteButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#dc3545"
};

const addButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#28a745",
  width: "100%",
  marginTop: "20px"
};

function Home() {
  const navigate = useNavigate();
  // Leggiamo gli utenti da localStorage, se non ci sono usiamo un array di default
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers
      ? JSON.parse(savedUsers)
      : [
          { id: 1, name: "Mario", age: 30, weight: 75, height: 175 },
          { id: 2, name: "Luigi", age: 28, weight: 70, height: 180 }
        ];
  });

  // Aggiorna localStorage quando `users` cambia
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Stati per gestire il form di creazione profilo
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  // Mostra/nasconde il form
  const toggleForm = () => {
    setShowForm(!showForm);
    // Se stiamo aprendo il form, puliamo i campi
    if (!showForm) {
      setName("");
      setAge("");
      setWeight("");
      setHeight("");
    }
  };

  // Crea un nuovo profilo
  const addUser = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newUser = {
      id: Date.now(),
      name,
      age: parseInt(age, 10),
      weight: parseInt(weight, 10),
      height: parseInt(height, 10)
    };
    setUsers([...users, newUser]);
    // Chiudi il form
    setShowForm(false);
  };

  // Elimina un profilo
  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  // Seleziona un profilo
  const selectUser = (id) => {
    navigate(`/dashboard/${id}`);
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: "center" }}>Seleziona un Profilo</h1>
      {users.map((user) => (
        <div key={user.id} style={profileCardStyle}>
          <div style={profileInfoStyle}>
            <h3 style={{ margin: "0 0 5px 0" }}>{user.name}</h3>
            <p style={{ margin: 0 }}>
              {user.age} anni, {user.weight} kg, {user.height} cm
            </p>
          </div>
          <div>
            <button onClick={() => selectUser(user.id)} style={buttonStyle}>
              Seleziona
            </button>
            <button onClick={() => deleteUser(user.id)} style={deleteButtonStyle}>
              Elimina
            </button>
          </div>
        </div>
      ))}

      {/* Pulsante per aprire/chiudere il form */}
      <button onClick={toggleForm} style={addButtonStyle}>
        {showForm ? "Annulla" : "+ Crea Nuovo Profilo"}
      </button>

      {/* Form di creazione profilo (inline) */}
      {showForm && (
        <form onSubmit={addUser} style={{ marginTop: "20px" }}>
          <div style={{ marginBottom: "10px" }}>
            <label>Nome: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Età: </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Peso (kg): </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Altezza (cm): </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
            />
          </div>
          <button type="submit" style={{ ...addButtonStyle, backgroundColor: "#007bff" }}>
            Crea Profilo
          </button>
        </form>
      )}
    </div>
  );
}

export default Home;
