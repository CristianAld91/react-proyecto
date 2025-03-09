import useFetch from '../customHooks/useFetch'; 
import ItemList from './ItemList';

const ItemListContainer = () => { 
  const { data, loading, error } = useFetch('/productos/productos.json');

  if (loading) {
    return <div>Cargando...</div>;
  }
  if (error) {
    return <div>ERROR: {error.message}</div>; 
  }

  console.log(data); // Asegúrate de que esto esté aquí

  return (
    <ItemList data={data} />
  );
};

export default ItemListContainer;
