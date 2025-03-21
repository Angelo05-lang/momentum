import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const phrases = [
  { text: "Il dolore è temporaneo, la gloria è per sempre.", author: "Arnold Schwarzenegger" },
  { text: "Non arrenderti mai, perché quando pensi che sia tutto finito, è il momento in cui tutto ha inizio.", author: "ChatGPT" },
  { text: "Il sudore di oggi è la vittoria di domani.", author: "Angelo Lombardo" },
  { text: "Ogni rep conta, ogni sforzo costruisce il tuo futuro.", author: "Angelo Lombardo" },
  { text: "Pensa, agisci, e non fermarti mai: il successo è nelle tue mani.", author: "ChatGPT" },
  { text: "Se vuoi diventare forte, devi abbracciare la fatica.", author: "Danny Lazzarin" },
  { text: "Il tuo corpo è il tuo tempio, coltivalo con costanza e dedizione.", author: "Angelo Lombardo" },
  { text: "La forza non viene dal vincere, le tue lotte sviluppano la tua forza.", author: "Arnold Schwarzenegger" },
  { text: "Quando la mente si impegna, il corpo segue.", author: "ChatGPT" },
  { text: "Non smettere mai di sfidare te stesso; è lì che risiede la vera crescita.", author: "Angelo Lombardo" },
  { text: "Inizia dove sei, usa quello che hai, fai quello che puoi.", author: "Arthur Ashe" },
  { text: "Ricorda, ogni sessione in palestra ti avvicina al tuo obiettivo.", author: "ChatGPT" },
  { text: "La determinazione oggi apre la porta al successo domani.", author: "Angelo Lombardo" },
  { text: "Ogni goccia di sudore è un mattoncino per costruire il tuo futuro.", author: "ChatGPT" },
  { text: "Non temere il fallimento, è solo un passo verso il successo.", author: "Danny Lazzarin" }
];

function DashboardHome() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [motivationalPhrase, setMotivationalPhrase] = useState({ text: "", author: "" });
  const [userName, setUserName] = useState("");

  // Seleziona casualmente una frase motivazionale
  useEffect(() => {
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setMotivationalPhrase(randomPhrase);
  }, []);

  // Carica il nome dell'utente dal localStorage
  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      const users = JSON.parse(savedUsers);
      const currentUser = users.find(u => u.id === parseInt(userId, 10));
      if (currentUser) {
        setUserName(currentUser.name);
      }
    }
  }, [userId]);

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

  const containerStyle = {
    textAlign: "center",
    marginTop: "50px"
  };

  const phraseStyle = {
    fontStyle: "italic",
    margin: "20px 0",
    fontSize: "18px"
  };

  return (
    <div style={containerStyle}>
      <h1>Momentum</h1>
      <h2>Benvenuto, {userName}</h2>
      <p style={phraseStyle}>
        "{motivationalPhrase.text}" - <strong>{motivationalPhrase.author}</strong>
      </p>
      <div>
        <button style={buttonStyle} onClick={() => navigate("dieta")}>
          Dieta
        </button>
        <button style={buttonStyle} onClick={() => navigate("esercizi")}>
          Esercizi
        </button>
        <button style={buttonStyle} onClick={() => navigate("circuito")}>
          Circuito
        </button>
        <button style={buttonStyle} onClick={() => navigate("profilo")}>
          Profilo
        </button>
      </div>
    </div>
  );
}

export default DashboardHome;
