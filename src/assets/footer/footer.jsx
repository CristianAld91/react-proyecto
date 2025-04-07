import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import './Footer.css'; 
import logo from '../img/celljr.png';

const Footer = () => {
  return (
    <Box className="footer">
      <img src={logo} alt="Logo" className="footer-logo" /> 
    
      <Typography variant="body2" gutterBottom>
        © {new Date().getFullYear()} Developed by: <strong>Cristian Alderete</strong> | <span className="company-name">Cell jr.s.a.</span>  Todos los derechos reservados.
      </Typography>
      <Box>
        <Link href="#" className="footer-link">Términos de Servicio</Link>
        <Link href="#" className="footer-link">Política de Privacidad</Link>
        <Link href="#" className="footer-link">Contacto</Link>
      </Box>
    </Box>
  );
};

export default Footer;
