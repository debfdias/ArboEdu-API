import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';

export default class FinalModal extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false, hidden: false };
  }

  render() {
    return (
      <React.Fragment>
        <Container className="d-block" hidden={this.state.hidden}>
          <row className="m-auto">
            <img
              src={require("./Ativo 10.svg")}
              height="50"
              className="d-block mx-auto img-fluid w-25"
              alt="ArboEdu logo"
            />
          </row>
          <row className="text-center p-3">
            <h2>Cadastro realizado com sucesso!</h2>
          </row>
          <row className="d-flex justify-content-center">
            <Button
              variant="entrar rounded-pill"
            >
              {" "}
              Prosseguir{" "}
            </Button>{" "}
          </row>
        </Container>
      </React.Fragment>
    );
  }
}