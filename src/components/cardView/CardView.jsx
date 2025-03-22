import React from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CardWidget from '../carWidget/CardWidget';

const CartView = ({ cartItems, removeFromCart }) => {
  const [cartOpen, setCartOpen] = React.useState(false);

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <>
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
                  <Button onClick={() => removeFromCart(item.id)}>Eliminar</Button>
                </ListItem>
              ))
            ) : (
              <Typography variant="body1" style={{ padding: '16px' }}>El carrito está vacío.</Typography>
            )}
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default CartView;
