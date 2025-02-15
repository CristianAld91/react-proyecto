import React from 'react';

const Card = ({ celular }) => {
  return (
    <div className="card">
      <img src={celular.imagenes.imgProducto} alt={celular.nombre} />
      <h2>{celular.nombre}</h2>
      <p>{celular.descripcion}</p>
      <p>Precio: ${celular.precio}</p>
      <p>Stock: {celular.stock}</p>
      {celular.nuevaColeccion && <span>Nueva Colección</span>}
      <img src={celular.imagenes.imgEstrella} alt="Estrella" />
    </div>
  );
};

export default Card;
