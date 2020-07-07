import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from './assets/icon.svg';
import UserIcon from './assets/user.svg'
import './header.css';
export default class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.state = { name: "", email: "", role: "", profilepic: "" }
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
                <Link onClick={() => console.log("Desconectado")} to="/">
                    Sair
                </Link>
                <img src={!this.state.profilepic ? UserIcon : this.state.profilepic } className="circular--square" alt="Ícone de usuário" />
            </div>
        )
    }
}

