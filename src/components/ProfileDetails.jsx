import React from "react";
import { useParams } from "react-router-dom";

const ProfileDetails = () => {
  // Recupera il nome del profilo dalla URL
  const { name } = useParams();

  return (
    <div>
      <h2>Dettagli del Profilo: {name}</h2>
      <p>Qui vanno i dettagli del profilo di {name}.</p>
    </div>
  );
};

export default ProfileDetails;
