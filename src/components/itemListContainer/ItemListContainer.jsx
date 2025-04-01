// components/itemListContainer/ItemListContainer.js
import React, { useEffect, useState } from 'react';
import useFetch from '../customHooks/useFetch'; 
import ItemList from '../itemList/ItemList';
import { useParams } from 'react-router-dom';

const ItemListContainer = ({ addToCart }) => {
  const { categoryId } = useParams(); 
  const { data, loading, error } = useFetch('products'); // Cambia a "products"

  if (loading) {
    return <div className='cargador'></div>; // Estilo de carga 
  }
  if (error) {
    return <div className='cargador'>ERROR: {error.message}</div>; 
  }

  // Filtrar los productos por categoría
  const filteredData = categoryId ? data.filter(item => item.categoria === categoryId) : data;

  return (
    <ItemList data={filteredData} addToCart={addToCart} />
  );
};

export default ItemListContainer;
