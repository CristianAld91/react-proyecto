// ItemListContainer.jsx
import React, { useEffect, useState } from 'react';
import ItemList from './ItemList'; 

const ItemListContainer = ({ greeting }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('/src/assets/productos/productos.json'); 
        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }
        const productos = await response.json();
        setData(productos);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div>
      <h1>{greeting}</h1>
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <ItemList data={data} /> 
      )}
    </div>
  );
};

export default ItemListContainer;
