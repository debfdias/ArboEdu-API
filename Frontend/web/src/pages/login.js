import React, { Component } from 'react';
import Header from "./home/header";
import api from "../services/api";

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleChange(event){
        this.setState({ ...this.state,[event.target.type] : event.target.value});
      }
      handleSubmit(event){
        if(this.state.email  !== '' && this.state.password !==''){
            api.post("/user/authenticate",this.state).then((response)=>{
                console.log(response);
            }).catch((error)=>{
                console.log(error.response.data);
            });
        }
    }
    render() {

        
        return (
            <React.Fragment>
                <Header />
                <Form onSubmit={this.handleSubmit} action="#">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type="email" placeholder="Digite seu e-mail" value={this.state.email} onChange={this.handleChange} />
                    </Form.Group>


                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Insira a sua senha" value={this.state.password} onChange={this.handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">Entrar</Button>
                </Form>
            </React.Fragment>
        );
    }
   
}

