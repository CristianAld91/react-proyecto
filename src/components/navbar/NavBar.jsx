import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import CardWidget from '../carWidget/CardWidget';
import CartView from '../cardView/CartView';
import logo from '/src/assets/img/celljr.png';
import '../navbar/navBar.css';
import { NavLink } from 'react-router-dom';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Celulares', path: '/category/celular' },
  { name: 'Tablets', path: '/category/tablet' },
];

function ResponsiveAppBar({ cartItems, removeFromCart }) {//error
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [showCart, setShowCart] = React.useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCartClick = () => {
    setShowCart((prev) => !prev);
  };

  const totalItems = (cartItems || []).reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <AppBar position="fixed">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <NavLink to="/" style={{ marginRight: '5px' }}>
            <img 
              src={logo} 
              alt="Logo" 
              style={{ width: '100px', height: '100px', marginTop: '0px', marginLeft: '25px' }} 
            />
          </NavLink>

          <NavLink to='/' style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Arial, sans-serif',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'white',
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              Cell Jr.
            </Typography>
          </NavLink>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'center' }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <NavLink to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'right' }}>
            {pages.map((page) => (
              <NavLink key={page.name} to={page.path} style={{ textDecoration: 'none' }}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block', fontFamily: 'Arial, sans-serif', fontWeight: 1000, margin: '20px' }}
                >
                  {page.name}
                </Button>
              </NavLink>
            ))}
          </Box>
          
          <IconButton
            size="large"
            aria-label="show cart items"
            color="inherit"
            onClick={handleCartClick}
          >
            <CardWidget cartItems={cartItems} />
          </IconButton>
        </Toolbar>
        {showCart && <CartView cartItems={cartItems}/>}
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
