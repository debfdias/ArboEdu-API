import React, { Component } from 'react';
import api from '../../services/api.js';
import Basic from './formik.js';
export default class Cadastro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Escolha uma opção antes de continuar o cadastro',
            formData:{
                Nome : String,
                

            }
        };
        this.cadastro = this.cadastro.bind(this);
        this.enviarDados = this.enviarDados.bind(this);
    };
    render() {
        return (Basic());
      /*  return (
            <div>
                <div id="seletor">
                    <select id="Tipo" onChange={this.cadastro}>
                        <option value=""></option>
                        <option value="administrador">Administrador</option>
                        <option value="aovemACE">Jovem ACE</option>
                        <option value="pesquisador">Pesquisador</option>
                        <option value="professor">Professor</option>
                        <option value="profissional de Educação">Profissional de Educação</option>
                    </select>
                    {this.state.value}
                </div>
            </div>
        );*/
    }
    cadastro(opção) {
        switch (opção.target.value) {
            case ("administrador"):
                this.setState({ value: this.admin() });
                break;
            case ("jovemACE"):
                this.setState({ value: this.jovemAce() });
                break;
            case (""):
                this.setState({ value: 'Escolha uma opção antes de continuar o cadastro' });
                break;
            default:
                this.setState({ value: this.diretorProfessorPatrono() })


        }
    };
    enviarDados(){
        console.log(api.post("/user", {
            "name": document.getElementById("nome").value,
            "phone": document.getElementById("telefone").value,
            "email": document.getElementById("email").value,
            "cpf": document.getElementById("cpf").value,
            "birthday": document.getElementById("dataNascimento").value,
            "password": document.getElementById("senha").value,
            "role": "administrador"
        }))
    };
    admin() {
        return (
            <div>
                <form onSubmit={this.enviarDados} action='#'>
                    <label htmlFor="nome">Nome</label>
                    <input  type="text" id="nome" placeholder="Nome completo" /><br />
                    <label htmlFor="telefone">Telefone</label>
                    <input  type="text" id="telefone" placeholder="(00) 00000-0000" /><br />
                    <label htmlFor="cpf">CPF</label>
                    <input  type="text" id="cpf" placeholder="Ex. 123.456.789-10" pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}" /><br />
                    <label htmlFor="cep">CEP</label>
                    <input  type="text" id="cep" placeholder="Ex. 12345-678" pattern="\d{5}-?\d{3}" /><br />
                    <label htmlFor="dataNascimento">Data de nascimento</label>
                    <input  type="date" id="dataNascimento" /><br />
                    <label htmlFor="email">E-mail</label>
                    <input  type="email" id="email" placeholder="Ex. contato@arboedu.com.br" /><br />
                    <label htmlFor="senha">Senha</label>
                    <input  type="password" id="senha" placeholder="********" /><br />
                    <label htmlFor="senhaConfirmacao">Repetir senha</label>
                    <input  type="password" id="senhaConfirmacao" placeholder="********" /><br />
                    <input  type="submit" value="Enviar" /><br />
                </form>
            </div>
        );
    };
    jovemAce() {
        return (
            <div>
                <form>
                    <label htmlFor="nome">Nome</label>
                    <input  type="text" id="nome" placeholder="Nome completo" /><br />
                    <label htmlFor="cpf">CPF</label>
                    <label htmlFor="cpf">Telefone</label>
                    <input  type="text" id="telefone" placeholder="(00) 00000-0000" /><br />
                    <input  type="text" id="cpf" placeholder="Ex. 123.456.789-10" pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}" /><br />
                    <label htmlFor="cep">CEP</label>
                    <input  type="text" id="cep" placeholder="Ex. 12345-678" pattern="\d{5}-?\d{3}" /><br />
                    <label htmlFor="dataNascimento">Data de nascimento</label>
                    <input  type="date" id="dataNascimento" /><br />
                    <label htmlFor="email">E-mail</label>
                    <input  type="email" id="email" placeholder="Ex. contato@arboedu.com.br" /><br />
                    <label htmlFor="senha">Senha</label>
                    <input  type="password" id="senha" placeholder="********" /><br />
                    <label htmlFor="senhaConfirmacao">Repetir senha</label>
                    <input  type="password" id="senhaConfirmacao" placeholder="********" /><br />
                    <label htmlFor="DS">Distrito Sanitário</label>
                    <input  type="text" id="DS" placeholder="Distrito Sanitário" /><br />
                    <label htmlFor="EDS">Escola que supervisiona no distrito sanitário</label>
                    <input  type="text" id="EDS" placeholder="Escola que supervisiona no distrito sanitário" /><br />
                    <input  type="submit" value="Enviar" /><br />
                </form>
            </div>
        );
    }
    diretorProfessorPatrono() {
        return (
            <div>
                <form>
                    <label htmlFor="nome">Nome</label>
                    <input  type="text" id="nome" placeholder="Nome completo" /><br />
                    <label htmlFor="cpf">CPF</label>
                    <label htmlFor="cpf">Telefone</label>
                    <input  type="text" id="telefone" placeholder="(00) 00000-0000" /><br />
                    <input  type="text" id="cpf" placeholder="Ex. 123.456.789-10" pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}" /><br />
                    <label htmlFor="cep">CEP</label>
                    <input  type="text" id="cep" placeholder="Ex. 12345-678" pattern="\d{5}-?\d{3}" /><br />
                    <label htmlFor="dataNascimento">Data de nascimento</label>
                    <input  type="date" id="dataNascimento" /><br />
                    <label htmlFor="email">E-mail</label>
                    <input  type="email" id="email" placeholder="Ex. contato@arboedu.com.br" /><br />
                    <label htmlFor="senha">Senha</label>
                    <input  type="password" id="senha" placeholder="********" /><br />
                    <label htmlFor="senhaConfirmacao">Repetir senha</label>
                    <input  type="password" id="senhaConfirmacao" placeholder="********" /><br />
                    <label htmlFor="disciplina">Disciplina</label>
                    <input  type="text" id="disciplina" placeholder="Disciplina" /><br />
                    <label htmlFor="escola">Escola</label>
                    <input  type="text" id="escola" placeholder="Escola" /><br />
                    <input  type="submit" value="Enviar" /><br />
                </form>
            </div>
        );
    }
}
