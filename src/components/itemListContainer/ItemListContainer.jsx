
import useFetch from '../customHooks/useFetch'; 
import ItemList from '../itemList/ItemList';
import { useParams } from 'react-router-dom';
import '../itemListContainer/itemListContainer.css'

const ItemListContainer = ({ addToCart }) => {
  const { categoryId } = useParams(); 
  const { data, loading, error } = useFetch('products'); // Cambia a "products"
  if (loading) {
    return (
      <div className='cargador-container'>
        <div className='cargador'></div> {/* Asegúrate de que esta clase esté definida en tu CSS */}
      </div>
    );
  }
  
  if (error) {
    return <div className='container-cargador'>ERROR: {error.message}</div>; 
  }

  // Filtrar los productos por categoría
  const filteredData = categoryId ? data.filter(item => item.categoria === categoryId) : data;

  return (
    <ItemList data={filteredData} addToCart={addToCart} />
  );
};

export default ItemListContainer;
