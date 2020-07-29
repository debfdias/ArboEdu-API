import React, { Component } from 'react';
import api from "../../services/api";
import Cadastro from '../cadastro/novoCadastro'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import './login.css'
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', login: true, showCadastro: false };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
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
    handleClose() {
        this.setState({ showCadastro: false })
    }
    handleShow() {
        this.setState({ showCadastro: true })
    }
    render() {


        return (
            <React.Fragment>
                <Form onSubmit={this.handleSubmit} action="http://localhost:3001/signin" method="POST" >
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Login" value={this.state.email} onChange={this.handleChange} name='email' />
                    </Form.Group>

                    {this.state.login && <div>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Senha" value={this.state.password} onChange={this.handleChange} name='password' />
                        </Form.Group>
                    </div>}
                    <div id="buttons">
                        <Button variant="primary" type="submit"> {this.state.login ? "ENTRAR" : "Enviar"}</Button>
                        <Button variant="secondary" onClick={this.forgotPassword} >{this.state.login ? "Esqueceu sua senha?" : "Voltar a tela de login"} </Button>
                    </div>
                </Form>

                <p>Não possui conta? <Button className="signupButton" variant="link" onClick={this.handleShow}>Cadastre-se</Button></p>
                <Modal size="lg" show={this.state.showCadastro} onHide={this.handleClose}>
                    <Modal.Body><Cadastro role="aluno" /></Modal.Body>
                </Modal>
            </React.Fragment>
        );
    }

}

