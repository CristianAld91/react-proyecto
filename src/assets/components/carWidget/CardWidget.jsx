import * as React from 'react';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const CardWidget = () => { 
  return (
    
      <Badge badgeContent={10} color="success">
        <ShoppingCartIcon color="action" />
      </Badge>
  );
}
export default CardWidget