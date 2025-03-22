import * as React from 'react';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CardWidget = ({ cartItems }) => { 
  const totalItems = (cartItems || []).reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <Badge 
      badgeContent={totalItems} 
      color="error"
      sx={{ 
        '& .MuiBadge-dot': { backgroundColor: 'orange' }, 
      }}
    >
      <ShoppingCartIcon sx={{ color: 'skyblue', fontSize:'35px' }} />
    </Badge>
  );
}

export default CardWidget;
