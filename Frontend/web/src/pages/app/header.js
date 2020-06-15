import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from './assets/icon.svg';
import './header.css';
export default class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.state = { name: "gabriel", email: "", role: "", profilepic: "https://st.depositphotos.com/1779253/5140/v/450/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg" }
    }
    render() {
        return (
            <div id="appHeader">
                <div id="icon">
                    <img src={Icon} alt="ícone" />
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
                <Link to="#">
                    Sair
                </Link>
                <img src={this.state.profilepic} className="circular--square" alt="Ícone de usuário" />
            </div>
        )
    }
}

