import useFetch from '../customHooks/useFetch'; 
import ItemList from '../itemList/ItemList';
import { useNavigate, useParams } from 'react-router-dom';

const ItemListContainer = () => { 
  const navigate = useNavigate();
  const { categoryId } = useParams(); 
  const { data, loading, error } = useFetch('/productos/productos.json');

  if (loading) {
    return <div>Cargando...</div>;
  }
  if (error) {
    return <div>ERROR: {error.message}</div>; 
  }

  // Filtrar los productos por categoria
  const filteredData = categoryId ? data.filter(item => item.categoria === categoryId) : data;

  return (
    <ItemList data={filteredData} />
  );
};

export default ItemListContainer;
