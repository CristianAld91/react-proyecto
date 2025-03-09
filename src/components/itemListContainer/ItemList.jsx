import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../itemListContainer/ItemListContainer.css';

const ItemList = ({ data }) => {
  const navigate = useNavigate(); 

  const handleCardClick = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="cardContainer">
      {data.map(celular => (
        <div className="card" key={celular.id} onClick={() => handleCardClick(celular.id)}>
          <img src={celular.imagenes.imgProducto} alt={celular.nombre} className='imgProducto' />
          <h2>{celular.nombre}</h2>
          <p>{celular.descripcion}</p>
          <p className='precio'>Precio: ${celular.precio}</p>
          <p>Stock: {celular.stock}</p>
          <button>Agregar al carrito</button>
          <button>+</button>
          <button>-</button>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
