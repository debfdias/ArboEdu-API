  import React, { Component } from 'react';
  import Admin from './admin';
  import Diretor from './diretor';
  import Professor from './professor';
  import Pesquisador from './pesquisador';
  import ProfissionalSaude from './profissional_saude';
  import ProfissionalEducacao from './profissional_educacao';
  import JovemAce from './jovem_ace';
  import Container from 'react-bootstrap/Container';
  import "../home/home.css";
  import Aluno from './aluno';
  import Form from 'react-bootstrap/Form'
  import './style.css'


  export default class Cadastro extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value: '',
        hidden: false,
        section: ''
      };
      this.cadastro = this.cadastro.bind(this);
    };

    setSection = (section) => {
      this.setState({section : section, hidden : true})   
    }

    getValue = () => {
      return this.state.value   
    }

    render() {
      return (
        <React.Fragment>
          <Container className="d-flex-column" hidden={this.state.hidden}>
            <row className="justify-content-center">
              <h6>Estado:</h6>
              <Form.Control as="select" size="sm" name="estados-brasil">
                <option value=""></option>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
              </Form.Control>
            </row>
            <row id="seletor">
              <h6 className="mt-4">Perfil:</h6>
              <Form.Control as="select" size="sm" id="Tipo" onChange={this.cadastro}>
                <option value=""></option>
                <option value="aluno">Aluno</option>
                <option value="administrador">Administrador</option>
                <option value="diretor">Diretor</option>
                <option value="jovem_ace">Jovem ACE</option>
                <option value="pesquisador">Pesquisador</option>
                <option value="professor">Professor</option>
                <option value="profissional_educacao">
                  Profissional de Educação
                    </option>
                <option value="profissional_saude">
                  Profissional de Saude
                    </option>
              </Form.Control>
            </row>
          </Container>
          {this.state.section}

        </React.Fragment>
      );
    }
    cadastro(opção) {
      switch (opção.target.value) {
        case ("administrador"):
          this.setState({ value: <Admin />});
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
