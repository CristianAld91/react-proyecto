import React from 'react';

const Card = ({ celular }) => {
  return (
    <div className="card">
      <img src={celular.imagenes.imgProducto} alt={celular.nombre} className='imgProduct'/>
      <h2>{celular.nombre}</h2>
      <p>{celular.descripcion}</p>
      <p className='precio'>Precio: ${celular.precio}</p>
      <p>Stock: {celular.stock}</p>
      <button>Agregar al carrito</button>
      <button>+</button>
      <button >-</button>
    </div>
  );
};

export default Card;
