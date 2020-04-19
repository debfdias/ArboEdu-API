import React from "react";
import { Link } from "react-router-dom";

import "./header.css";

const Header = () => {
    return (
        <header id='home-header' >
            <Link to="/" > Home </Link> 
            <Link to="/equipe" > Sobre nós </Link> 
            <Link to="/pesquisa" > Projeto </Link> 
            <Link to="/contato" > Contato </Link> 
            <Link to="/cadastro" > cadastro </Link>
            < button id="entrar" > Entrar </button>
        </header>
    );
}

export default Header;