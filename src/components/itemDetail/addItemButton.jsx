import React from 'react';
import { IconButton, Drawer, List, ListItem, ListItemText, TextField, Button, Snackbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CardWidget from '../carWidget/CardWidget';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CartButtons = ({ cartOpen, cartItems, updateQuantity, handlePurchase, toggleCart, total, buyerName, setBuyerName, buyerEmail, setBuyerEmail, snackbarOpen, setSnackbarOpen, snackbarMessage, snackbarSeverity, removeItem, clearCart }) => {
    return (
        <React.Fragment>
            <IconButton onClick={toggleCart}>
                <CardWidget cartItems={cartItems} />
            </IconButton>
            <Drawer anchor="right" open={cartOpen} onClose={toggleCart}>
                <div style={{ width: 400 }}>
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
                                    />
                                    <Button 
                                        variant="outlined" 
                                        color="secondary" 
                                        onClick={() => removeItem(item.id)} 
                                        style={{ marginLeft: '10px' }}
                                    >
                                        Eliminar
                                    </Button>
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
                    <Button 
                        variant="outlined" 
                        color="secondary" 
                        onClick={clearCart} 
                        fullWidth 
                        style={{ marginTop: '10px' }}
                    >
                        Borrar Todos
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

export default CartButtons;
