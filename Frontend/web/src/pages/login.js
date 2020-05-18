import React, { Component } from 'react';
import Header from "./home/header";
import api from "../services/api";

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: ''};
        this.login = true;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
    }
    handleChange(event) {
        this.setState({ ...this.state, [event.target.type]: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        if (this.state.email !== '' && (this.state.password !== '' || !this.login )) {
            if(!this.login){
                api.post('/user/passwordRecovery', {email: this.state.email}).then((response)=>{
                    console.log(response);
                }).catch((error)=>{
                    console.log(error.response);
                });
            }
            api.post('/signin', {email: this.state.email, password : this.state.password}).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });
        }
    }
    forgotPassword(event){
        this.login = !this.login;
        this.forceUpdate();
    }
    render() {


        return (
            <React.Fragment>
                <Header />
                <Form onSubmit={this.handleSubmit} >
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type="email" placeholder="Digite seu e-mail" value={this.state.email} onChange={this.handleChange} />
                    </Form.Group>

                    {this.login && <div>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" placeholder="Insira a sua senha" value={this.state.password} onChange={this.handleChange} />
                        </Form.Group>
                    </div>}
                    <Button variant="primary" type="submit"> {this.login ? "Entrar" : "Enviar"}</Button>
                    <Button variant="secondary" onClick={this.forgotPassword} >{this.login ? "Esqueceu sua senha?" :"Voltar a tela de Login"} </Button>

                </Form>
            </React.Fragment>
        );
    }

}

