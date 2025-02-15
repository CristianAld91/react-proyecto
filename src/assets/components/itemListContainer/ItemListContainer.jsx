
import React from 'react';

const ItemListContainer = ({ greeting}) => {
  return (
    <div>
      <h1>Hola!! Bienvenido {greeting}</h1>
      <p>Explora nuestros productos y disfruta de grandes ofertas.</p>
      <button>Ver Productos</button>
    </div>
  );
};
export default ItemListContainer;
