import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from "./home/header";
import api from "../services/api";


import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { email: 'gaqp@cin.ufpe.br', password: '82305235723572', login: true };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
    }
    handleChange(event) {
        this.setState({ ...this.state, [event.target.type]: event.target.value });
    }
    handleSubmit(event) {
        if (this.state.email !== '' && (this.state.password !== '' || !this.state.login)) {
            if (!this.state.login) {
                event.preventDefault();
                api.post('/user/passwordRecovery', { email: this.state.email }).then((response) => {
                    console.log(response.data);
                }).catch((error) => {
                    console.log(error.response);
                });
            }
            return;
        } else {
            event.preventDefault();
        }
    }
    forgotPassword(event) {
        this.setState({ login: !this.state.login });
    }
    render() {


        return (
            <React.Fragment>
                <Header />
                <Form onSubmit={this.handleSubmit} action="http://localhost:3001/signin" method="POST" >
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type="email" placeholder="Digite seu e-mail" value={this.state.email} onChange={this.handleChange} name='email' />
                    </Form.Group>

                    {this.state.login && <div>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" placeholder="Insira a sua senha" value={this.state.password} onChange={this.handleChange} name='password' />
                        </Form.Group>
                    </div>}
                    <Button variant="primary" type="submit"> {this.state.login ? "Entrar" : "Enviar"}</Button>
                    <Button variant="secondary" onClick={this.forgotPassword} >{this.state.login ? "Esqueceu sua senha?" : "Voltar a tela de Login"} </Button>

                </Form>
                <Link to='/cadastro'><p>Ainda não é cadastrado? clique aqui e cadastre-se</p></Link>
            </React.Fragment>
        );
    }

}

