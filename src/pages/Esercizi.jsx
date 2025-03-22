import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const containerStyle = {
  maxWidth: "800px",
  margin: "40px auto",
  padding: "20px",
  backgroundColor: "#fff",
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

const formStyle = {
  marginBottom: "30px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "16px",
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

const successButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#28a745",
  color: "#fff",
};

const dangerButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#dc3545",
  color: "#fff",
};

// Aggiorna l'array dei giorni in italiano
const daysOfWeek = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];

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

  // Stato per la lista degli esercizi (ogni esercizio ha: id, name, reps, kg, note, day)
  const [exercises, setExercises] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  // Stato per il form per aggiungere un nuovo esercizio
  const [newExercise, setNewExercise] = useState({
    name: "",
    reps: "",
    kg: "",
    note: "",
  });
  // Ora il giorno selezionato viene usato anche per assegnare il nuovo esercizio
  const [selectedDay, setSelectedDay] = useState(daysOfWeek[0]);

  // Stato per l'editing di un esercizio
  const [editingExerciseId, setEditingExerciseId] = useState(null);
  const [editExercise, setEditExercise] = useState({
    name: "",
    reps: "",
    kg: "",
    note: "",
    day: "",
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(exercises));
  }, [exercises, storageKey]);

  // Funzione per aggiungere un nuovo esercizio; usa il giorno selezionato
  const handleAddExercise = (e) => {
    e.preventDefault();
    if (!newExercise.name || !newExercise.reps || !newExercise.kg) return;
    const exerciseToAdd = {
      id: Date.now(),
      ...newExercise,
      note: newExercise.note || "-",
      day: selectedDay, // usa il giorno selezionato
    };
    setExercises([...exercises, exerciseToAdd]);
    setNewExercise({ name: "", reps: "", kg: "", note: "" });
  };

  // Funzione per eliminare un esercizio
  const handleDeleteExercise = (id) => {
    setExercises(exercises.filter((ex) => ex.id !== id));
  };

  // Inizia la modalità di editing per un esercizio
  const startEditingExercise = (exercise) => {
    setEditingExerciseId(exercise.id);
    setEditExercise({ ...exercise });
  };

  // Salva le modifiche apportate
  const handleSaveEdit = (e) => {
    e.preventDefault();
    const updatedExercises = exercises.map((ex) =>
      ex.id === editingExerciseId ? { ...editExercise } : ex
    );
    setExercises(updatedExercises);
    setEditingExerciseId(null);
    setEditExercise({ name: "", reps: "", kg: "", note: "", day: "" });
  };

  // Annulla la modifica
  const cancelEdit = () => {
    setEditingExerciseId(null);
    setEditExercise({ name: "", reps: "", kg: "", note: "", day: "" });
  };

  // Filtra gli esercizi in base al giorno selezionato
  const filteredExercises = exercises.filter((ex) => ex.day === selectedDay);

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

      {/* Visualizzazione degli esercizi per il giorno selezionato */}
      {filteredExercises.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>
          Nessun esercizio assegnato a {selectedDay}.
        </p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Esercizio</th>
                <th style={thStyle}>Reps</th>
                <th style={thStyle}>Kg</th>
                <th style={thStyle}>Note</th>
                <th style={thStyle}>Giorno</th>
                <th style={thStyle}>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {filteredExercises.map((ex) => (
                <tr key={ex.id}>
                  {editingExerciseId === ex.id ? (
                    <>
                      <td style={tdStyle}>
                        <input
                          type="text"
                          value={editExercise.name}
                          onChange={(e) =>
                            setEditExercise({ ...editExercise, name: e.target.value })
                          }
                          style={inputStyle}
                        />
                      </td>
                      <td style={tdStyle}>
                        <input
                          type="text"
                          value={editExercise.reps}
                          onChange={(e) =>
                            setEditExercise({ ...editExercise, reps: e.target.value })
                          }
                          style={inputStyle}
                        />
                      </td>
                      <td style={tdStyle}>
                        <input
                          type="text"
                          value={editExercise.kg}
                          onChange={(e) =>
                            setEditExercise({ ...editExercise, kg: e.target.value })
                          }
                          style={inputStyle}
                        />
                      </td>
                      <td style={tdStyle}>
                        <input
                          type="text"
                          value={editExercise.note}
                          onChange={(e) =>
                            setEditExercise({ ...editExercise, note: e.target.value })
                          }
                          style={inputStyle}
                        />
                      </td>
                      <td style={tdStyle}>
                        <select
                          value={editExercise.day || selectedDay}
                          onChange={(e) =>
                            setEditExercise({ ...editExercise, day: e.target.value })
                          }
                          style={selectStyle}
                        >
                          {daysOfWeek.map((day) => (
                            <option key={day} value={day}>
                              {day}
                            </option>
                          ))}
                        </select>
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
                      <td style={tdStyle}>{ex.note}</td>
                      <td style={tdStyle}>{ex.day}</td>
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
        </div>
      )}

      {/* Form per aggiungere un nuovo esercizio per il giorno selezionato */}
      <form onSubmit={handleAddExercise} style={formStyle}>
        <h3 style={{ textAlign: "center" }}>
          Aggiungi nuovo esercizio per {selectedDay}
        </h3>
        <input
          type="text"
          placeholder="Nome esercizio"
          value={newExercise.name}
          onChange={(e) =>
            setNewExercise({ ...newExercise, name: e.target.value })
          }
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Reps (es. 8/6/4)"
          value={newExercise.reps}
          onChange={(e) =>
            setNewExercise({ ...newExercise, reps: e.target.value })
          }
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Kg (es. 10/12/14)"
          value={newExercise.kg}
          onChange={(e) =>
            setNewExercise({ ...newExercise, kg: e.target.value })
          }
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Note (opzionali)"
          value={newExercise.note}
          onChange={(e) =>
            setNewExercise({ ...newExercise, note: e.target.value })
          }
          style={inputStyle}
        />
        <button type="submit" style={successButtonStyle}>
          Aggiungi Esercizio
        </button>
      </form>
    </div>
  );
}

export default Esercizi;
