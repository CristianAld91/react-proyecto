import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Typography, Button, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CardWidget from '../carWidget/CardWidget';
import {  calculateTotal } from '../cart/Cart';

const CartView = ({ cartItems, updateQuantity, setCartItems }) => {
    const [cartOpen, setCartOpen] = useState(false);
    const [buyerName, setBuyerName] = useState('');
    const [buyerEmail, setBuyerEmail] = useState('');

    const toggleCart = () => {
        setCartOpen(!cartOpen);
    };

    const total = calculateTotal(cartItems);

    const handlePurchase = () => {
        if (buyerName && buyerEmail) {
            alert(`Compra realizada por: ${buyerName}, Email: ${buyerEmail}`);
            setCartItems([]); // Vaciar el carrito después de la compra
            setBuyerName('');
            setBuyerEmail('');
        } else {
            alert('Por favor, ingresa tu nombre y correo electrónico.');
        }
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
                                    <Button onClick={() => (item.id)}>Eliminar</Button> 
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
        </React.Fragment>
    );
};

export default CartView;
