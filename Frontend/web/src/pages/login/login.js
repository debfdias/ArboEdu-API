import React, { Component } from 'react';
import Header from "../home/header.js";
import api from "../../services/api";
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './login.css';
import { Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import UsarModal from '../../components/modal.js';
import Aluno from '../cadastro/aluno.js';
import Admin from '../cadastro/admin.js';
import Diretor from '../cadastro/diretor.js';
import JovemAce from '../cadastro/jovem_ace.js';
import Professor from '../cadastro/professor.js';
import ProfissionalEducacao from '../cadastro/profissional_educacao.js';
import Pesquisador from '../cadastro/pesquisador.js';
import ProfissionalSaude from '../cadastro/profissional_saude.js';
import Cadastro from '../cadastro/cadastro.js';
import FinalModal from '../../components/finalModal.js';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', buttonName: "Avançar"};
        this.login = true;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
        this.UsarModal = React.createRef();
        this.Cadastro = React.createRef();
    }

    handleModal = () => {
      this.UsarModal.current.handleShow();   
    }

    handleChange(event) {
        this.setState({ ...this.state, [event.target.type]: event.target.value });
    }

    botaoModal = () =>{
        if (this.state.buttonName === 'Finalizar'){
          this.UsarModal.current.hiddenButton()
          this.Cadastro.current.setSection(<FinalModal/>)
        }
        
        else {
        this.Cadastro.current.setSection(this.Cadastro.current.getValue());
        this.setState({buttonName : "Finalizar"});
        }
    }

    modalClose = () =>{
      this.setState({buttonName : "Avançar"});
      
      
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
            <Container>
              <Row className="recuo">
                <Col xs={6} md={4} lg={4}>
                  <Form onSubmit={this.handleSubmit}>
                    <p className="titulo_login">Efetue seu login:</p>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>E-mail</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Digite seu e-mail"
                        value={this.state.email}
                        onChange={this.handleChange}
                      />
                    </Form.Group>

                    {this.login && (
                      <div>
                        <Form.Group controlId="formBasicPassword">
                          <Form.Label>Senha</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Insira a sua senha"
                            value={this.state.password}
                            onChange={this.handleChange}
                          />
                        </Form.Group>
                      </div>
                    )}
                    <Button block variant="entrar rounded-pill" type="submit">
                      {" "}
                      {this.login ? "Entrar" : "Enviar"}
                    </Button>
                    <Button
                      block
                      variant="secondary rounded"
                      onClick={this.forgotPassword}
                    >
                      {this.login
                        ? "Esqueci minha senha"
                        : "Voltar a tela de Login"}{" "}
                    </Button>
                    <Navbar.Text>
                      Não possui conta?{" "}
                        <Button variant="primary" onClick={this.handleModal}>
                          Cadastre-se
                        </Button>
                    </Navbar.Text>

                
                    <UsarModal ref={this.UsarModal} title="Cadastro" onClick={this.botaoModal}
                     buttonName={this.state.buttonName} onClose={this.modalClose}>
                    <Cadastro ref={this.Cadastro}></Cadastro>
                      { this.state.showAdmin && (<Admin /> )}
                      { this.state.showAluno && (<Aluno /> )}
                      { this.state.showDiretor && (<Diretor /> )}
                      { this.state.showJovemace && (<JovemAce /> )}
                      { this.state.showPesquisador && (<Pesquisador /> )}
                      { this.state.showProfessor && (<Professor /> )}
                      { this.state.showProfEdu && (<ProfissionalEducacao /> )}
                      { this.state.showProfSaude && (<ProfissionalSaude /> )}
                    </UsarModal>
                  </Form>
                </Col>
              </Row>
            </Container>
          
            {/*<Button href="" variant="primary" onClick={this.handleClick} >Cadastre-se</Button>*/}
          </React.Fragment>
        );
    }

}
