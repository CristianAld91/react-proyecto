import useFetch from '../customHooks/useFetch';
import { useParams } from 'react-router-dom';

const ItemDetailContainer = () => {
    const { id } = useParams();
    const { data, loading } = useFetch('./productos/productos.json');


    if (loading) {
        return <div>Cargando...</div>;
    }

    const producto = data.find(item => item.id === parseInt(id));

    return (
        <div>
            {producto ? (
                <>
                    <h2>{producto.nombre}</h2>
                    <img src={producto.imagenes.imgProducto} alt={producto.nombre} />
                    <p>{producto.descripcion}</p>
                    <p>Precio: ${producto.precio}</p>
                    <p>Stock: {producto.stock}</p>
                </>
            ) : (
                <div>Producto no encontrado</div>
            )}
        </div>
    );
};

export default ItemDetailContainer;
