import React from 'react';
import useFetch from '../customHooks/useFetch';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, CircularProgress } from '@mui/material';
import '../itemDetailContainer/itemDetailContainer.css'; 

const ItemDetailContainer = () => {
    const { id } = useParams();
    const { data, loading } = useFetch('/productos/productos.json');

    if (loading) {
        return <CircularProgress />;
    }

    const producto = data ? data.find(item => item.id === parseInt(id)) : null;

    return (
        <div className="container">
            {producto ? (
                <Card className="card">
                    <CardMedia
                        component="img"
                        className="card-media"
                        image={producto.imagenes.imgProducto}
                        alt={producto.nombre}
                    />
                    <CardContent className="card-content">
                        <Typography className="card-title" gutterBottom variant="h5" component="div">
                            {producto.nombre}
                        </Typography>
                        <Typography className="card-description" variant="body2" color="text.secondary">
                            {producto.descripcion}
                        </Typography>
                        <Typography className="card-price" variant="h6" color="text.primary">
                            Precio: ${producto.precio}
                        </Typography>
                        <Typography className="card-stock" variant="body2" color="text.secondary">
                            Stock: {producto.stock}
                        </Typography>

                        {/* Detalles adicionales */}
                        <Typography className="card-details-title" variant="h6" gutterBottom>
                            Detalles del Producto:
                        </Typography>
                        <Typography className="card-detail" variant="body2" color="text.secondary">
                            Cámara: {producto.especificaciones.camara.mp} MP ({producto.especificaciones.camara.tipo})
                        </Typography>
                        <Typography className="card-detail" variant="body2" color="text.secondary">
                            Batería: {producto.especificaciones.bateria.capacidad} mAh
                        </Typography>
                        <Typography className="card-detail" variant="body2" color="text.secondary">
                            Carga Rápida: {producto.especificaciones.bateria.cargaRapida ? 'Sí' : 'No'}
                        </Typography>
                        <Typography className="card-detail" variant="body2" color="text.secondary">
                            Procesador: {producto.especificaciones.procesador}
                        </Typography>
                        <Typography className="card-detail" variant="body2" color="text.secondary">
                            RAM: {producto.especificaciones.ram}
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
                <div>
                    <h2>Producto no encontrado</h2>
                    <p>Por favor verifica que el ID en la URL sea correcto.</p>
                </div>
            )}
        </div>
    );
};

export default ItemDetailContainer;
