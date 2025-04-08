import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/client';
import { Card, CardContent, CardMedia, Typography, CircularProgress, Button } from '@mui/material';
import './itemDetailContainer.css';

const ItemDetailContainer = ({ addToCart }) => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            const docRef = doc(db, 'products', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setProducto({ id: docSnap.id, ...docSnap.data() });
            } else {
                console.log("No se encontró el documento!");
            }
            setLoading(false);
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className='cargador-container'>
                <div className='cargador'></div> 
            </div>
        );
    }


    const increment = () => {
        if (quantity < producto.stock) {
            setQuantity(prev => prev + 1);
        }
    };

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleAddToCart = () => {
        if (producto.stock >= quantity) {
            addToCart({ ...producto, cantidad: quantity });
            setQuantity(1); // Reiniciar cantidad después de agregar
        } else {
            alert('El producto no está disponible en stock');
        }
    };

    return (
        <div className="container"> {/* estilos de cart cuando se ingresa por item de material*/}
            {producto ? (
                <Card className="card">
                    <CardMedia
                        component="img"
                        className="card-media"
                        image={producto.imgProducto}
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
                        <Typography className="card-capacidad" variant="body2" color="text.secondary">
                            Capacidad: {producto.capacidad}
                        </Typography>
                        <Typography className="card-cargaRapida" variant="body2" color="text.secondary">
                            Carga Rápida: {producto.cargaRapida}
                        </Typography>
                        <Typography className="card-procesador" variant="body2" color="text.secondary">
                            Procesador: {producto.procesador}
                        </Typography>
                        <Typography className="card-nuevaColeccion" variant="body2" color="text.secondary">
                            Nueva Colección: {producto.nuevaColeccion ? 'Sí' : 'No'}
                        </Typography>
                        <div className="quantity-controls">
                            <Button onClick={decrement}>-</Button>
                            <input
                                type="number"
                                min="1"
                                max={producto.stock}
                                value={quantity}
                                readOnly
                                aria-label={`Cantidad de ${producto.nombre}`}
                            />
                            <Button onClick={increment}>+</Button>
                        </div>
                        <Button variant="contained" color="primary" onClick={handleAddToCart}>
                            Agregar al carrito
                        </Button>
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
