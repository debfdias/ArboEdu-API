import React from 'react';
import {Link} from 'react-router-dom';

import './header.css';

const Header = () => {
    return(
        <header id='home-header'>
            <Link to="#home">Home</Link>
            <Link to="#about">Sobre nós</Link>
            <Link to="#project">Projeto</Link>
            <Link to="#contato">Contato</Link>
            <Link to="/cadastro"><button id="sign in">Entrar</button></Link>
        </header>

    );
}

export default Header;
