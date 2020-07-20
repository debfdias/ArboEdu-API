import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import API from '../../services/api'

export default class Cadastro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: "gabriel",
            phone: "1234",
            email: "gaqp@cin.uf",
            cpf: "1",
            birthday: "1998-10-11",
            password: "1234",
            role: this.props.role,
            institution: "",
            distrito: "",
            address_city: "",
            address_neighborhood: "",
            address_zip: "",
            address_number: "",
            address_complement: "",
            authorized: false,
            validado: false,
            erros:{
                generico:{
                    vazio:"Este campo é obrigatório"
                },
                nome:{
                    erro: "",
                    curto: "Este campo tem que ter ao menos 3 caracteres"
                },
                phone:{
                    erro: "",
                    invalido:"Telefone incorreto"
                },
                cpf:{
                    erro:"",
                    invalido: "CPF inválido"
                },
                


            }
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePhoneChange = this.handlePhoneChange.bind(this)
        this.handleCPFChange = this.handleCPFChange.bind(this)
        this.handleBirthdayChange = this.handleBirthdayChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleInstitutionChange = this.handleInstitutionChange.bind(this)
        this.handleDistrictChange = this.handleDistrictChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleNameChange(event) {
        this.setState({ nome: event.target.value })
    }
    handleEmailChange(event) {
        this.setState({ email: event.target.value })
    }
    handlePhoneChange(event) {
        this.setState({ phone: event.target.value })
    }
    handleCPFChange(event) {
        this.setState({ cpf: event.target.value })
    }
    handleBirthdayChange(event) {
        this.setState({ birthday: event.target.value })
    }
    handlePasswordChange(event) {
        this.setState({ password: event.target.value })
    }
    handleInstitutionChange(event) {
        this.setState({ institution: event.target.value })
    }
    handleDistrictChange(event) {
        this.setState({ distrito: event.target.value })
    }
    handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        this.setState({ formValidado: true });
    };
    render() {
        return (
            <Form noValidate validated={this.state.formValidado} onSubmit={this.handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>Nome Completo</Form.Label>
                    <Form.Control required type="text" placeholder="Insira seu nome" value={this.state.nome} onChange={this.handleNameChange} />
                    <Form.Control.Feedback type="invalid">Este campo é obrigatório</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control required type="email" placeholder="Insira seu Email" value={this.state.email} onChange={this.handleEmailChange} />
                    <Form.Control.Feedback type="invalid">Este campo é obrigatório</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formPhone">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control required type="text" placeholder="Insira seu Telefone" value={this.state.phone} onChange={this.handlePhoneChange} />
                    <Form.Control.Feedback type="invalid">Este campo é obrigatório</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formCPF">
                    <Form.Label>CPF</Form.Label>
                    <Form.Control required type="text" placeholder="Insira seu CPF" value={this.state.cpf} onChange={this.handleCPFChange} />
                    <Form.Control.Feedback type="invalid">Este campo é obrigatório</Form.Control.Feedback>

                </Form.Group>
                <Form.Group controlId="formBirthday">
                    <Form.Label>Data de nascimento</Form.Label>
                    <Form.Control required type="date" value={this.state.birthday} onChange={this.handleBirthdayChange} />
                    <Form.Control.Feedback type="invalid">Este campo é obrigatório</Form.Control.Feedback>

                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control required type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                    <Form.Control.Feedback type="invalid">Este campo é obrigatório</Form.Control.Feedback>

                </Form.Group>
                {(this.props.role === "pesquisador"
                    || this.props.role === "profissional_saude"
                    || this.props.role === "profissional_educacao"
                    || this.props.role === "diretor"
                ) &&
                    <Form.Group controlId="formInstitution">
                        <Form.Label>Instituição</Form.Label>
                        <Form.Control required type="text" value={this.state.institution} onChange={this.handleInstitutionChange} />
                        <Form.Control.Feedback type="invalid">Este campo é obrigatório</Form.Control.Feedback>

                    </Form.Group>
                }
                {(this.props.role === "jovem_ace") &&
                    <Form.Group controlId="formDistrict">
                        <Form.Label>Distrito Sanitário</Form.Label>
                        <Form.Control required as="select" value={this.state.distrito_sanitario} defaultValue="Escolha um distrito" onChange={this.handleDistrictChange}>
                            <option>Escolha um Distrito</option>
                            <option>...</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">Este campo é obrigatório</Form.Control.Feedback>
                    </Form.Group>
                }
                {(this.props.role === "aluno") &&
                    <React.Fragment>
                        <Form.Group controlId="formAddressCity">
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control required type="text" value={this.state.address_city} />
                            <Form.Control.Feedback type="invalid">Este campo é obrigatório</Form.Control.Feedback>

                        </Form.Group>
                        <Form.Group controlId="formAddressNeighborhood">
                            <Form.Label>Bairro</Form.Label>
                            <Form.Control required type="text" value={this.state.address_neighborhood} />
                            <Form.Control.Feedback type="invalid">Este campo é obrigatório</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formAddressZip">
                            <Form.Label>CEP</Form.Label>
                            <Form.Control required type="text" value={this.state.address_zip} />
                            <Form.Control.Feedback type="invalid">Este campo é obrigatório</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formAddressNumber">
                            <Form.Label>Número</Form.Label>
                            <Form.Control required type="text" value={this.state.address_number} />
                            <Form.Control.Feedback type="invalid">Este campo é obrigatório</Form.Control.Feedback>

                        </Form.Group>
                        <Form.Group controlid="formAddressComplement">
                            <Form.Label>Complemento</Form.Label>
                            <Form.Control required type="text" value={this.state.address_complement} />
                            <Form.Control.Feedback type="invalid">Este campo é obrigatório</Form.Control.Feedback>

                        </Form.Group>
                        <Form.Group controlId="formAuthorized">
                            <Form.Check required custom type="checkbox" label="Tenho autorização para ingressar no ArboEdu" id="authorizedCheckbox" />
                            <Form.Control.Feedback type="invalid">Este campo é obrigatório</Form.Control.Feedback>

                        </Form.Group>
                    </React.Fragment>
                }
                <Button type="submit">
                    Criar conta
                </Button>
            </Form>
        )
    }
}