import React, { Component } from 'react';
import api from '../../services/api.js';

export default class Cadastro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Escolha uma opção antes de continuar o cadastro',
            formData:{}
        };
        this.cadastro = this.cadastro.bind(this);
    };
    render() {
        return (
            <div>
                <div id="seletor">
                    <select id="Tipo" onChange={this.cadastro}>
                        <option value=""></option>
                        <option value="Administrador">Administrador</option>
                        <option value="Jovem ACE">Jovem ACE</option>
                        <option value="Pesquisador">Pesquisador</option>
                        <option value="Professor">Professor</option>
                        <option value="Profissional de Educação">Profissional de Educação</option>
                    </select>
                    {this.state.value}
                </div>
            </div>
        );
    }
    cadastro(opção) {
        switch (opção.target.value) {
            case ("Administrador"):
                this.setState({ value: <this.admin /> });
                break;
            case ("Jovem ACE"):
                this.setState({ value: <this.jovemAce /> });
                break;
            case (""):
                this.setState({ value: 'Escolha uma opção antes de continuar o cadastro' });
                break;
            default:
                this.setState({ value: <this.diretorProfessorPatrono /> })


        }
    };
    enviarDados(){
        console.log(api.post("/user", {
            "name": "João da Silva",
            "phone": "8512345678",
            "email": "teste1@uol.com",
            "cpf": "4328938439",
            "birthday": "1997-06-10",
            "password": "123456",
            "role": "pesquisador",
            "extra": {
                "institution": "FIOCRUZ"
            }
        }))
    };
    admin() {
        return (
            <div>
                <form id="adminForm">
                    <label htmlFor="nome">Nome</label>
                    <input required type="text" id="nome" placeholder="Nome completo" /><br />
                    <label htmlFor="cpf">CPF</label>
                    <input required type="text" id="cpf" placeholder="Ex. 123.456.789-10" pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}" /><br />
                    <label htmlFor="cep">CEP</label>
                    <input required type="text" id="cep" placeholder="Ex. 12345-678" pattern="\d{5}-?\d{3}" /><br />
                    <label htmlFor="dataNascimento">Data de nascimento</label>
                    <input required type="date" id="dataNascimento" /><br />
                    <label htmlFor="email">E-mail</label>
                    <input required type="email" id="email" placeholder="Ex. contato@arboedu.com.br" /><br />
                    <label htmlFor="senha">Senha</label>
                    <input required type="password" id="senha" placeholder="********" /><br />
                    <label htmlFor="senhaConfirmacao">Repetir senha</label>
                    <input required type="password" id="senhaConfirmacao" placeholder="********" /><br />
                    <input required type="submit" value="Enviar" /><br />
                </form>
            </div>
        );
    };
    jovemAce() {
        return (
            <div>
                <form>
                    <label htmlFor="nome">Nome</label>
                    <input required type="text" id="nome" placeholder="Nome completo" /><br />
                    <label htmlFor="cpf">CPF</label>
                    <input required type="text" id="cpf" placeholder="Ex. 123.456.789-10" pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}" /><br />
                    <label htmlFor="cep">CEP</label>
                    <input required type="text" id="cep" placeholder="Ex. 12345-678" pattern="\d{5}-?\d{3}" /><br />
                    <label htmlFor="dataNascimento">Data de nascimento</label>
                    <input required type="date" id="dataNascimento" /><br />
                    <label htmlFor="email">E-mail</label>
                    <input required type="email" id="email" placeholder="Ex. contato@arboedu.com.br" /><br />
                    <label htmlFor="senha">Senha</label>
                    <input required type="password" id="senha" placeholder="********" /><br />
                    <label htmlFor="senhaConfirmacao">Repetir senha</label>
                    <input required type="password" id="senhaConfirmacao" placeholder="********" /><br />
                    <label htmlFor="DS">Distrito Sanitário</label>
                    <input required type="text" id="DS" placeholder="Distrito Sanitário" /><br />
                    <label htmlFor="EDS">Escola que supervisiona no distrito sanitário</label>
                    <input required type="text" id="EDS" placeholder="Escola que supervisiona no distrito sanitário" /><br />
                    <input required type="submit" value="Enviar" /><br />
                </form>
            </div>
        );
    }
    diretorProfessorPatrono() {
        return (
            <div>
                <form>
                    <label htmlFor="nome">Nome</label>
                    <input required type="text" id="nome" placeholder="Nome completo" /><br />
                    <label htmlFor="cpf">CPF</label>
                    <input required type="text" id="cpf" placeholder="Ex. 123.456.789-10" pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}" /><br />
                    <label htmlFor="cep">CEP</label>
                    <input required type="text" id="cep" placeholder="Ex. 12345-678" pattern="\d{5}-?\d{3}" /><br />
                    <label htmlFor="dataNascimento">Data de nascimento</label>
                    <input required type="date" id="dataNascimento" /><br />
                    <label htmlFor="email">E-mail</label>
                    <input required type="email" id="email" placeholder="Ex. contato@arboedu.com.br" /><br />
                    <label htmlFor="senha">Senha</label>
                    <input required type="password" id="senha" placeholder="********" /><br />
                    <label htmlFor="senhaConfirmacao">Repetir senha</label>
                    <input required type="password" id="senhaConfirmacao" placeholder="********" /><br />
                    <label htmlFor="disciplina">Disciplina</label>
                    <input required type="text" id="disciplina" placeholder="Disciplina" /><br />
                    <label htmlFor="escola">Escola</label>
                    <input required type="text" id="escola" placeholder="Escola" /><br />
                    <input required type="submit" value="Enviar" /><br />
                </form>
            </div>
        );
    }
}
