import React, { useState } from 'react';
import '../styles/settings.css';

export default function Settings() {
  const [showOptions, setShowOptions] = useState(false);
  const [alternateEmails, setAlternateEmails] = useState([]);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const changeImage = () => {
    alert('Función para cambiar imagen no implementada');
  };

  const deleteImage = () => {
    const userImage = document.getElementById('user-image');
    if (userImage) {
      userImage.src = 'https://via.placeholder.com/80';
    }
    alert('Imagen eliminada');
  };

  const addAlternateEmail = () => {
    setAlternateEmails([...alternateEmails, '']);
  };

  return (
    <div>
      <head>
        <title>Focus Timers | Settings</title>
      </head>
      <main>
        <div className="config-container">
          <h1>Configuración de Usuario</h1>
          {/* Imagen del Usuario */}
          <div className="config-item user-image">
            <img
              src="https://via.placeholder.com/80"
              alt="Imagen de usuario"
              id="user-image"
              onClick={toggleOptions}
              style={{ cursor: 'pointer' }}
            />
            {showOptions && (
              <div className="image-options">
                <button className="change" onClick={changeImage}>
                  Cambiar
                </button>
                <button className="delete" onClick={deleteImage}>
                  Eliminar
                </button>
              </div>
            )}
          </div>
          {/* Nombre del Usuario */}
          <div className="config-item">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" defaultValue="Nombre del Usuario" />
          </div>
          {/* Correo Electrónico */}
          <div className="config-item">
            <label htmlFor="email">Correo Registrado</label>
            <input type="email" id="email" defaultValue="usuario@correo.com" />
          </div>
          {/* Correos Alternativos */}
          <div className="add-email">
            <button onClick={addAlternateEmail}>Agregar Dirección Alternativa</button>
          </div>
          {alternateEmails.map((_, index) => (
            <div className="config-item" key={index}>
              <label htmlFor={`alternate-email-${index}`}>Correo Alternativo</label>
              <input
                type="email"
                id={`alternate-email-${index}`}
                placeholder="correo@alternativo.com"
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
