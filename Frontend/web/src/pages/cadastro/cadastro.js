import React, { Component } from 'react';
import Admin from './admin';
import Diretor from './diretor';
import Professor from './professor';
import Pesquisador from './pesquisador';
import ProfissionalSaude from './profissional_saude'
import ProfissionalEducacao from './profissional_educacao'
import JovemAce from './jovem_ace';
import Aluno from './aluno';
import Header from '../home/header'
export default class Cadastro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Escolha uma opção antes de continuar o cadastro'
        };
        this.cadastro = this.cadastro.bind(this);
    };
    render() {
        return (
            <div>
                <Header />
                <div id="seletor">
                    <select id="Tipo" onChange={this.cadastro}>
                        <option value=""></option>
                        <option value="aluno">Aluno</option>
                        <option value="administrador">Administrador</option>
                        <option value="diretor">Diretor</option>
                        <option value="jovem_ace">Jovem ACE</option>
                        <option value="pesquisador">Pesquisador</option>
                        <option value="professor">Professor</option>
                        <option value="profissional_educacao">Profissional de Educação</option>
                        <option value="profissional_saude">Profissional de Saude</option>
                    </select>
                    {this.state.value}
                </div>
            </div>
        );
    }
    cadastro(opção) {
        switch (opção.target.value) {
            case ("administrador"):
                this.setState({ value: <Admin /> });

                break;
            case ("diretor"):
                this.setState({ value: <Diretor /> });
                break;
            case ("professor"):
                this.setState({ value: <Professor /> });
                break;
            case ("pesquisador"):
                this.setState({ value: <Pesquisador /> });
                break;
            case ("profissional_saude"):
                this.setState({ value: <ProfissionalSaude /> });
                break;
            case ("profissional_educacao"):
                this.setState({ value: <ProfissionalEducacao /> });
                break;
            case ("jovem_ace"):
                this.setState({ value: <JovemAce /> });
                break;
            case ("aluno"):
                this.setState({ value: <Aluno /> });
                break;

            default:

                this.setState({ value: 'Escolha uma opção antes de continuar o cadastro' });
                break;
        }
    };
}
