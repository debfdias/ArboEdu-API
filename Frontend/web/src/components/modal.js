import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export default class UsarModel extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false, hidden: false };
  }

  handleClose = () => {
    this.setState({ show: false });
    if (this.props.onClose) {
      this.props.onClose();
      this.setState({hidden: false});
    }
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  hiddenButton = () => {
    this.setState({ hidden: true });
  };

  showButton = () => {
    this.setState({hidden: false})
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title className="titulo_modal">{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.children}</Modal.Body>
        <Modal.Footer>
          {!this.state.hidden && (
            <Button variant="entrar" onClick={this.props.onClick}>
              {this.props.buttonName}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    );
  }
}