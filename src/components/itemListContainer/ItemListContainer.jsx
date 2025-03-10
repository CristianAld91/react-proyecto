import useFetch from '../customHooks/useFetch'; 
import ItemList from '../itemList/ItemList';
import { useNavigate } from 'react-router-dom';

const ItemListContainer = () => { 
  const navigate = useNavigate();
  const { data, loading, error } = useFetch('/productos/productos.json');

  if (loading) {
    return <div>Cargando...</div>;
  }
  if (error) {
    return <div>ERROR: {error.message}</div>; 
  }

  console.log(data); 

  return (
    <ItemList data={data} />
  );
};

export default ItemListContainer;
