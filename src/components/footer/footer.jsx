import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import './Footer.css'; 
import logo from '../../assets/img/celljr.png';

const Footer = () => {
  return (
    <Box className="footer">
      <img src={logo} alt="Logo" className="footer-logo" /> 
    
      <Typography variant="body2" gutterBottom>
        <span className="company-name">© {new Date().getFullYear()} Cell jr.</span> Todos los derechos reservados.
      </Typography>
      <Typography variant="body2" gutterBottom>
        Desarrollado por: <strong>Cristian Alderete</strong>
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
