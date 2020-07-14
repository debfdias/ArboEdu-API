import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from './assets/icon.svg';
import UserIcon from './assets/user.svg'
import './header.css';

import API from '../../services/api'
export default class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.state = { name: "", email: "", role: "", profilepic: "" }
        this.logout = this.logout.bind(this);
    }
    async logout(){

        await API.get('/logout').then(console.log("desconectado"));
        
    } 
    render() {
        return (
            <div id="appHeader">
                <div>
                    <img src={Icon} alt="ícone" id="icon"/>
                </div>
                <Link to="#">
                    Home
                        </Link>
                <Link to="#">
                    Histórico
                        </Link>
                <Link to="#">
                    Resultados
                        </Link>
                <Link to="#">
                    Preferências
                        </Link>
                <Link onClick={this.logout} to="/">
                    Sair
                </Link>
                <img src={!this.state.profilepic ? UserIcon : this.state.profilepic } className="circular--square" alt="Ícone de usuário" />
            </div>
        )
    }
}

