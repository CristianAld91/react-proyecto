import React, { useEffect, useState } from 'react';
import useFetch from '../customHooks/useFetch'; 
import ItemList from '../itemList/ItemList';
import { useNavigate, useParams } from 'react-router-dom';

const ItemListContainer = ({ addToCart }) => { // Agregar addToCart aquí
  const navigate = useNavigate();
  const { categoryId } = useParams(); 
  const { data, loading, error } = useFetch('/productos/productos.json');
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 

  }, []);

  if (loading || isLoading) {
    return <div className='cargador'></div>;//Estilo de carga 
  }
  if (error) {
    return <div className='cargador'>ERROR: {error.message}</div>; 
  }

  // Filtrar los productos por categoria
  const filteredData = categoryId ? data.filter(item => item.categoria === categoryId) : data;

  return (
    <ItemList data={filteredData} addToCart={addToCart} /> // Pasar addToCart aquí
  );
};

export default ItemListContainer;
