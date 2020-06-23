import React from "react";
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./header.css";


/*const Header = () => {
  return (
    {<header id="home-header">
      <img id="logo" src={require('./logo_branco.svg')} alt="logo branca"/>
      <Link to="/home"> Home </Link>
      <Link to="/objetivos"> Objetivos </Link>{" "}
      <Link to="/equipe"> Equipe </Link>
      <Link to="/pesquisa"> Pesquisa </Link>{" "}
      <Link to="/atividades"> Atividades </Link>{" "}
      <Link to="/contato"> Contato </Link>{" "}
      <Link to="/login">
        <Button variant="entrar" > Entrar </Button>{" "}
      </Link>{" "}
    </header>
  );
};*/

const Header = () => {
  return (
    <div className="Header shadow mb-5 bg-white rounded">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>
          <img
            src={require("./logo_branco.svg")}
            height="50"
            className="d-inline-block align-top"
            alt="ArboEdu logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto justify-content-between flex-fill">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/objetivos">Objetivos</Nav.Link>
            <Nav.Link href="/equipe">Equipe</Nav.Link>
            <Nav.Link href="/pesquisa">Pesquisa</Nav.Link>
            <Nav.Link href="/atividades">Atividades</Nav.Link>
            <Nav.Link href="/contato">Contato</Nav.Link>
            <Nav.Link href="/login">
              <Button variant="entrar rounded-pill"> Entrar </Button>{" "}
            </Nav.Link>{" "}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
/*<NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
      <img
              src={require("./logo_branco.svg")}
              className="h-100"
              alt=" logo"
            />
      */