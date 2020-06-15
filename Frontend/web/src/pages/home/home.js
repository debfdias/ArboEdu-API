import React, {Component} from 'react';

import './home.css';
import Header from './header.js'

export default class Home extends Component{
    render(){
        return(
            <div id="home">
            <Header/>
            <div id="home-content">
            <h1>Bem-Vindo!</h1>
            <p>Este é um estudo piloto que faz parte de uma pesquisa sobre o uso
                de dispositivos móveis para execução de ações educativas visando à mudança
                de comportamento da população em relação à prevenção de arboviroses,
                como a Dengue, Zika e Chikungunya.
            </p>
            </div>
            </div>
        );
    }
}
