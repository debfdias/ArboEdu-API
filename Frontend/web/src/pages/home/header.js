import React from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'

import Logo from "./assets/logo.svg"
import "./header.css";

const Header = () => {
    return (
        <div id='home-header' >
            <img src={Logo} alt="logotipo" />
            <Link to="/" > Home </Link>
            <Link to="/equipe" > Sobre nós </Link>
            <Link to="/pesquisa" > Projeto </Link>
            <Link to="/contato" > Contato </Link>
            <Link to="/login" > <Button id="Login" variant="primary" size="lg" active > Entrar </Button> </Link>
        </div>
    );
}

 
export default Header;