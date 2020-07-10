import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Cadastro from '../pages/cadastro/cadastro.js';


export default class UsarModel extends Component {
    constructor(props) {
        super(props);
        this.state = {show : false};
    }
  
    handleClose = () => this.setState({show : false});

    handleShow = () => this.setState({show : true});

    render() {
        return (
        
            <Modal show={this.state.show} onHide={this.handleClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title className="titulo_modal">Cadastro</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.props.children}
            <Cadastro></Cadastro>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="entrar" onClick={this.handleClose}>
                Avançar
                </Button>
            </Modal.Footer>
            </Modal>

        );
    }
}