import * as React from 'react';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CardWidget = () => { 
  return (
    <Badge 
      badgeContent={10} 
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
