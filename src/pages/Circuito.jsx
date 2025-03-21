import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Timer from "../components/Timer";

// Stili generali per il contenitore e il titolo
const containerStyle = {
  maxWidth: "800px",
  margin: "40px auto",
  padding: "20px",
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
};

const titleStyle = {
  textAlign: "center",
  fontFamily: "Arial, sans-serif",
  color: "#333",
  marginBottom: "20px"
};

// Stile per il form di aggiunta
const formStyle = {
  marginBottom: "30px",
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "16px"
};

// Stile per la sezione Timer
const timerContainerStyle = {
  textAlign: "center",
  marginBottom: "20px"
};

// Stile per la tabella principale
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px"
};

const thStyle = {
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "10px",
  textAlign: "left"
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "left"
};

// Stile per i pulsanti
const buttonStyle = {
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  minWidth: "120px"
};

const primaryButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#007bff",
  color: "#fff"
};

const successButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#28a745",
  color: "#fff"
};

const dangerButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#dc3545",
  color: "#fff"
};

function Circuito() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const storageKey = `circuits-table-${userId}`;

  // Stato per il nome utente (caricato dal localStorage "users")
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      const users = JSON.parse(savedUsers);
      const currentUser = users.find((u) => u.id === parseInt(userId, 10));
      if (currentUser) setUserName(currentUser.name);
    }
  }, [userId]);

  // Stato per il timer
  const [timerActive, setTimerActive] = useState(false);
  const [timerDuration, setTimerDuration] = useState(60); // durata predefinita in secondi

  // Stato per la lista dei circuiti
  // Ogni circuito: { id, name, rounds, reps, kg, rest, note }
  const [circuits, setCircuits] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  // Stati per il form di aggiunta di un nuovo circuito
  // I campi "reps" e "kg" sono di tipo text per permettere valori separati da "/"
  const [newCircuitName, setNewCircuitName] = useState("");
  const [newRounds, setNewRounds] = useState("");
  const [newReps, setNewReps] = useState("");
  const [newKg, setNewKg] = useState("");
  const [newRest, setNewRest] = useState("");
  const [newNote, setNewNote] = useState("");

  // Stato per l'editing del circuito
  const [editingCircuitId, setEditingCircuitId] = useState(null);
  const [editCircuitName, setEditCircuitName] = useState("");
  const [editRounds, setEditRounds] = useState("");
  const [editReps, setEditReps] = useState("");
  const [editKg, setEditKg] = useState("");
  const [editRest, setEditRest] = useState("");
  const [editNote, setEditNote] = useState("");

  // Aggiorna il localStorage ogni volta che cambia la lista dei circuiti
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(circuits));
  }, [circuits, storageKey]);

  // Aggiunge un nuovo circuito
  const handleAddCircuit = (e) => {
    e.preventDefault();
    if (!newCircuitName.trim() || !newRounds || !newReps || !newKg) return;
    const newCircuit = {
      id: Date.now(),
      name: newCircuitName.trim(),
      rounds: newRounds,
      reps: newReps,
      kg: newKg,
      rest: newRest,
      note: newNote.trim()
    };
    setCircuits([...circuits, newCircuit]);
    setNewCircuitName("");
    setNewRounds("");
    setNewReps("");
    setNewKg("");
    setNewRest("");
    setNewNote("");
  };

  // Elimina un circuito
  const handleDeleteCircuit = (circuitId) => {
    setCircuits(circuits.filter((circuit) => circuit.id !== circuitId));
  };

  // Inizia l'editing per un circuito
  const startEditingCircuit = (circuit) => {
    setEditingCircuitId(circuit.id);
    setEditCircuitName(circuit.name);
    setEditRounds(circuit.rounds);
    setEditReps(circuit.reps);
    setEditKg(circuit.kg);
    setEditRest(circuit.rest);
    setEditNote(circuit.note);
  };

  // Salva le modifiche apportate al circuito
  const handleSaveEdit = (e) => {
    e.preventDefault();
    const updatedCircuits = circuits.map((circuit) =>
      circuit.id === editingCircuitId
        ? { ...circuit, name: editCircuitName, rounds: editRounds, reps: editReps, kg: editKg, rest: editRest, note: editNote }
        : circuit
    );
    setCircuits(updatedCircuits);
    setEditingCircuitId(null);
    setEditCircuitName("");
    setEditRounds("");
    setEditReps("");
    setEditKg("");
    setEditRest("");
    setEditNote("");
  };

  // Annulla l'editing
  const cancelEdit = () => {
    setEditingCircuitId(null);
    setEditCircuitName("");
    setEditRounds("");
    setEditReps("");
    setEditKg("");
    setEditRest("");
    setEditNote("");
  };

  return (
    <div style={containerStyle}>
      <button onClick={() => navigate(-1)} style={primaryButtonStyle}>
        Indietro
      </button>
      
      {/* Sezione Timer per il circuito */}
      <div style={timerContainerStyle}>
        <input
          type="number"
          placeholder="Durata Timer (sec)"
          value={timerDuration}
          onChange={(e) => setTimerDuration(e.target.value)}
          style={{ ...inputStyle, width: "200px", marginRight: "10px" }}
        />
        <button onClick={() => setTimerActive(true)} style={primaryButtonStyle}>
          Avvia Timer
        </button>
      </div>
      {timerActive && (
        <div style={timerContainerStyle}>
          <Timer
            duration={Number(timerDuration)}
            onComplete={() => setTimerActive(false)}
          />
        </div>
      )}

      <h2 style={titleStyle}>
        {userName
          ? `Circuiti Personalizzati per ${userName}`
          : `Circuiti per Utente ${userId}`}
      </h2>
      <form onSubmit={handleAddCircuit} style={formStyle}>
        <input
          type="text"
          placeholder="Nome Circuito"
          value={newCircuitName}
          onChange={(e) => setNewCircuitName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Round"
          value={newRounds}
          onChange={(e) => setNewRounds(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Reps (es. 8/6/4)"
          value={newReps}
          onChange={(e) => setNewReps(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Kg (es. 10/12/14)"
          value={newKg}
          onChange={(e) => setNewKg(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Riposo (sec)"
          value={newRest}
          onChange={(e) => setNewRest(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Note (opzionali)"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={successButtonStyle}>
          Aggiungi Circuito
        </button>
      </form>
      {circuits.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>
          Nessun circuito aggiunto.
        </p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Circuito</th>
              <th style={thStyle}>Round</th>
              <th style={thStyle}>Reps</th>
              <th style={thStyle}>Kg</th>
              <th style={thStyle}>Riposo</th>
              <th style={thStyle}>Note</th>
              <th style={thStyle}>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {circuits.map((circuit) => (
              <tr key={circuit.id}>
                {editingCircuitId === circuit.id ? (
                  <>
                    <td style={tdStyle}>
                      <input
                        type="text"
                        value={editCircuitName}
                        onChange={(e) => setEditCircuitName(e.target.value)}
                        style={inputStyle}
                      />
                    </td>
                    <td style={tdStyle}>
                      <input
                        type="text"
                        value={editRounds}
                        onChange={(e) => setEditRounds(e.target.value)}
                        style={inputStyle}
                      />
                    </td>
                    <td style={tdStyle}>
                      <input
                        type="text"
                        value={editReps}
                        onChange={(e) => setEditReps(e.target.value)}
                        style={inputStyle}
                      />
                    </td>
                    <td style={tdStyle}>
                      <input
                        type="text"
                        value={editKg}
                        onChange={(e) => setEditKg(e.target.value)}
                        style={inputStyle}
                      />
                    </td>
                    <td style={tdStyle}>
                      <input
                        type="text"
                        value={editRest}
                        onChange={(e) => setEditRest(e.target.value)}
                        style={inputStyle}
                      />
                    </td>
                    <td style={tdStyle}>
                      <input
                        type="text"
                        value={editNote}
                        onChange={(e) => setEditNote(e.target.value)}
                        style={inputStyle}
                      />
                    </td>
                    <td style={tdStyle}>
                      <button onClick={handleSaveEdit} style={primaryButtonStyle}>
                        Salva
                      </button>
                      <button onClick={cancelEdit} style={{ ...dangerButtonStyle, marginLeft: "5px" }}>
                        Annulla
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td style={tdStyle}>{circuit.name}</td>
                    <td style={tdStyle}>{circuit.rounds}</td>
                    <td style={tdStyle}>{circuit.reps}</td>
                    <td style={tdStyle}>{circuit.kg}</td>
                    <td style={tdStyle}>{circuit.rest}</td>
                    <td style={tdStyle}>{circuit.note || "-"}</td>
                    <td style={tdStyle}>
                      <button onClick={() => startEditingCircuit(circuit)} style={primaryButtonStyle}>
                        Modifica
                      </button>
                      <button onClick={() => handleDeleteCircuit(circuit.id)} style={{ ...dangerButtonStyle, marginLeft: "5px" }}>
                        Elimina
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Circuito;
