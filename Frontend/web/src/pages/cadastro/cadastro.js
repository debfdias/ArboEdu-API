import React, { Component } from 'react';

export default class Cadastro extends Component {
    render() {
        return (
            <div>
                <div id="seletor">
                    <select id="Tipo" onChange={this.cadastro()}>
                        <option value="Administrador">Administrador</option>
                        <option value="Jovem ACE">Jovem ACE</option>
                        <option value="Pesquisador">Pesquisador</option>
                        <option value="Professor">Professor</option>
                        <option value="Profissional de Educação">Profissional de Educação</option>
                    </select>
                </div>
            </div>
        );
    }
    cadastro(opção) {
        console.log(opção);
    };
    generico() {
        return (
                <div>
                <input type="text" id="nome" placeholder="Nome completo" /><br />
                <input type="text" id="cpf" placeholder="Ex. 123.456.789-10" required pattern="\d{3}.?\d{3}.?\d{3}-?\d{2}" /><br />
                <input type="text" id="cep" placeholder="Ex. 12345-678" required pattern="\d{5}-?\d{3}" /><br />
                <input type="date" id="dataNascimento" /><br />
                <input type="email" id="email" placeholder="Ex. contato@arboedu.com.br" />
                <input type="password" id="Senha" placeholder="********" />
                <input type="password" id="SenhaConfirmacao" placeholder="********" />
                </div>
        );
    };
    jovemAce(){
        return(
            <div>
            this.generico(),
            <input type="text" id="DS" placeholder="Distrito Sanitário"/>
            <input type="text" id="EDS" placeholder="Escola que supervisiona no distrito sanitário"/>
            </div>
        );
    }
    diretorProfessorPatrono(){
        return(
            <div>
            this.generico(),
            <input type="text" id="disciplina" placeholder="Disciplina"/>
            <input type="text" id="Escola" placeholder="Escola"/>
            </div>
        );
    }
    
}
