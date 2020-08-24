import React, { Component } from 'react';
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
            <Navbar id="appNavbar" collapseOnSelect={true} expand="lg">
                <Navbar.Brand >
                    <img src={Icon} alt="ícone" id="icon" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#historico">Histórico</Nav.Link>
                        <Nav.Link href="#resultados">Resultados</Nav.Link>
                        <Nav.Link href="#preferencias">Preferências</Nav.Link>
                        <Nav.Link onClick={this.logout}>Sair</Nav.Link>
                        <Nav.Item className="profilePicDiv">
                            <img src={!this.state.profilepic ? UserIcon : this.state.profilepic} alt="Ícone de usuário" />
                        </Nav.Item>
                    </Nav>

                </Navbar.Collapse>
            </Navbar>

        )
    }
}

