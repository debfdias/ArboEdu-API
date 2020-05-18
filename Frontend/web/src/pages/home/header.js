import React from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'

import "./header.css";

const Header = () => {
    return (
        <header id='home-header' >
            <Link to="/" > Home </Link> 
            <Link to="/equipe" > Sobre nós </Link> 
            <Link to="/pesquisa" > Projeto </Link> 
            <Link to="/contato" > Contato </Link> 
            <Link to="/cadastro" > cadastro </Link>
            <Link to="/login" > <Button id="Login" variant="primary" size="lg" active > Entrar </Button> </Link>
        </header>
    );
}

export default Header;