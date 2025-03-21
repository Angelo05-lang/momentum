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

function Esercizi() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const storageKey = `exercises-table-${userId}`;

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

  // Stato per la lista degli esercizi
  // Ogni esercizio: { id, name, reps, kg, note }
  const [exercises, setExercises] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  // Stati per il form di aggiunta di un nuovo esercizio
  const [newExerciseName, setNewExerciseName] = useState("");
  const [newReps, setNewReps] = useState("");
  const [newKg, setNewKg] = useState("");
  const [newNote, setNewNote] = useState("");

  // Stato per l'editing dell'esercizio
  const [editingExerciseId, setEditingExerciseId] = useState(null);
  const [editExerciseName, setEditExerciseName] = useState("");
  const [editReps, setEditReps] = useState("");
  const [editKg, setEditKg] = useState("");
  const [editNote, setEditNote] = useState("");

  // Stati per il timer
  const [timerActive, setTimerActive] = useState(false);
  const [timerDuration, setTimerDuration] = useState(60); // Durata predefinita in secondi

  // Aggiorna il localStorage ogni volta che cambiano gli esercizi
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(exercises));
  }, [exercises, storageKey]);

  // Funzione per aggiungere un nuovo esercizio
  const handleAddExercise = (e) => {
    e.preventDefault();
    if (!newExerciseName.trim() || !newReps || !newKg) return;
    const newExercise = {
      id: Date.now(),
      name: newExerciseName.trim(),
      reps: newReps,
      kg: newKg,
      note: newNote.trim()
    };
    setExercises([...exercises, newExercise]);
    setNewExerciseName("");
    setNewReps("");
    setNewKg("");
    setNewNote("");
  };

  // Funzione per eliminare un esercizio
  const handleDeleteExercise = (exerciseId) => {
    setExercises(exercises.filter((ex) => ex.id !== exerciseId));
  };

  // Inizia l'editing per un esercizio
  const startEditingExercise = (exercise) => {
    setEditingExerciseId(exercise.id);
    setEditExerciseName(exercise.name);
    setEditReps(exercise.reps);
    setEditKg(exercise.kg);
    setEditNote(exercise.note);
  };

  // Salva le modifiche apportate all'esercizio
  const handleSaveEdit = (e) => {
    e.preventDefault();
    const updatedExercises = exercises.map((ex) =>
      ex.id === editingExerciseId
        ? { ...ex, name: editExerciseName, reps: editReps, kg: editKg, note: editNote }
        : ex
    );
    setExercises(updatedExercises);
    setEditingExerciseId(null);
    setEditExerciseName("");
    setEditReps("");
    setEditKg("");
    setEditNote("");
  };

  // Annulla la modalità di modifica
  const cancelEdit = () => {
    setEditingExerciseId(null);
    setEditExerciseName("");
    setEditReps("");
    setEditKg("");
    setEditNote("");
  };

  return (
    <div style={containerStyle}>
      <button onClick={() => navigate(-1)} style={primaryButtonStyle}>
        Indietro
      </button>
      <h2 style={titleStyle}>
        {userName
          ? `Esercizi Personalizzati per ${userName}`
          : `Esercizi per Utente ${userId}`}
      </h2>
      
      {/* Sezione Timer */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
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
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Timer
            duration={Number(timerDuration)}
            onComplete={() => setTimerActive(false)}
          />
        </div>
      )}

      <form onSubmit={handleAddExercise} style={formStyle}>
        <input
          type="text"
          placeholder="Nome esercizio"
          value={newExerciseName}
          onChange={(e) => setNewExerciseName(e.target.value)}
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
          placeholder="Note (opzionali)"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={successButtonStyle}>
          Aggiungi Esercizio
        </button>
      </form>
      {exercises.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>
          Nessun esercizio aggiunto.
        </p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Esercizio</th>
              <th style={thStyle}>Reps</th>
              <th style={thStyle}>Kg</th>
              <th style={thStyle}>Note</th>
              <th style={thStyle}>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((ex) => (
              <tr key={ex.id}>
                {editingExerciseId === ex.id ? (
                  <>
                    <td style={tdStyle}>
                      <input
                        type="text"
                        value={editExerciseName}
                        onChange={(e) => setEditExerciseName(e.target.value)}
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
                    <td style={tdStyle}>{ex.name}</td>
                    <td style={tdStyle}>{ex.reps}</td>
                    <td style={tdStyle}>{ex.kg}</td>
                    <td style={tdStyle}>{ex.note || "-"}</td>
                    <td style={tdStyle}>
                      <button onClick={() => startEditingExercise(ex)} style={primaryButtonStyle}>
                        Modifica
                      </button>
                      <button onClick={() => handleDeleteExercise(ex.id)} style={{ ...dangerButtonStyle, marginLeft: "5px" }}>
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

export default Esercizi;
