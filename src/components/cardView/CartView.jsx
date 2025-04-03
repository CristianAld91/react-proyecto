import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Typography, Button, TextField, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CardWidget from '../carWidget/CardWidget';
import { calculateTotal } from '../cart/Cart';
import { db } from '../../firebase/client'; 
import { collection, addDoc } from "firebase/firestore";
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CartView = ({ cartItems, updateQuantity, clearCart, removeItem }) => {
    const [cartOpen, setCartOpen] = useState(false);
    const [buyerName, setBuyerName] = useState('');
    const [buyerEmail, setBuyerEmail] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const toggleCart = () => {
        setCartOpen(!cartOpen);
    };
    
    const total = calculateTotal(cartItems);
    
    const handlePurchase = async () => {
        if (buyerName && buyerEmail) {
            try {
                const orderData = {
                    buyerName,
                    buyerEmail,
                    items: cartItems.map(item => ({
                        id: item.id,
                        nombre: item.nombre,
                        cantidad: item.cantidad,
                        precio: item.precio,
                    })),
                    createdAt: new Date(),
                };

                await addDoc(collection(db, "orders"), orderData);
                setSnackbarMessage(`Compra realizada por: ${buyerName}, Email: ${buyerEmail}`);
                setSnackbarSeverity('success');
                setSnackbarOpen(true);

                clearCart(); // Limpia el carrito
                setBuyerName('');
                setBuyerEmail('');
            } catch (error) {
                console.error("Error al guardar la orden: ", error);
                setSnackbarMessage('Hubo un error al procesar tu compra. Intenta nuevamente.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        } else {
            setSnackbarMessage('Por favor, ingresa tu nombre y correo electrónico.');
            setSnackbarSeverity('warning');
            setSnackbarOpen(true);
        }
    };

    const handleRemoveItem = (id) => {
        removeItem(id); // Llama a la función para eliminar el item
    };

    return (
        <React.Fragment>
            <IconButton onClick={toggleCart}>
                <CardWidget cartItems={cartItems} />
            </IconButton>
            <Drawer anchor="right" open={cartOpen} onClose={toggleCart}>
                <div style={{ width: 250 }}>
                    <IconButton onClick={toggleCart}>
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ padding: '16px' }}>Carrito</Typography>
                    <List>
                        {cartItems.length > 0 ? (
                            cartItems.map(item => (
                                <ListItem key={item.id}>
                                    <ListItemText 
                                        primary={`${item.nombre} - ${item.cantidad} x $${item.precio}`} 
                                    />
                                    <TextField
                                        type="number"
                                        value={item.cantidad}
                                        onChange={(e) => {
                                            const quantity = parseInt(e.target.value);
                                            if (!isNaN(quantity) && quantity >= 1) {
                                                updateQuantity(item.id, quantity);
                                            }
                                        }}
                                        style={{ width: '50px', marginRight: '10px' }}
                                        inputProps={{ min: 1 }}
                                    />
                                    <Button onClick={() => handleRemoveItem(item.id)}>Eliminar</Button> 
                                </ListItem>
                            ))
                        ) : (
                            <Typography variant="body1" style={{ padding: '16px' }}>El carrito está vacío.</Typography>
                        )}
                    </List>
                    <Typography variant="h6" style={{ padding: '16px' }}>
                        Total: ${total}
                    </Typography>
                    <TextField 
                        label="Nombre del comprador" 
                        value={buyerName} 
                        onChange={(e) => setBuyerName(e.target.value)} 
                        fullWidth 
                        style={{ marginBottom: '10px' }} 
                    />
                    <TextField 
                        label="Correo electrónico" 
                        value={buyerEmail} 
                        onChange={(e) => setBuyerEmail(e.target.value)} 
                        fullWidth 
                        style={{ marginBottom: '10px' }} 
                    />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handlePurchase} 
                        fullWidth
                    >
                        Comprar
                    </Button>
                </div>
            </Drawer>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
};

export default CartView;
