import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from './assets/icon.svg';
import UserIcon from './assets/user.svg'
import './header.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import API from '../../services/api'
export default class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.state = { name: "", email: "", role: "", profilepic: "" }
        this.logout = this.logout.bind(this);
    }
    async logout() {

        await API.get('/logout').then(console.log("desconectado"));
        window.location.href = "/";


    }
    render() {
        return (
            <div>
                <Navbar collapseOnSelect={true} bg="light" expand="lg">
                    <Navbar.Brand >
                        <img src={Icon} alt="ícone" id="icon" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#historico">Histórico</Nav.Link>
                            <Nav.Link href="#resultados">Resultados</Nav.Link>
                            <Nav.Link href="#preferencias">Preferências</Nav.Link>
                            <Nav.Link href="#sair" onClick={this.logout}>Sair</Nav.Link>


                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div id="appHeader">
                    <div>
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
                    <img src={!this.state.profilepic ? UserIcon : this.state.profilepic} className="circular--square" alt="Ícone de usuário" />
                </div>
            </div>
        )
    }
}

