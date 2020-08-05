import React from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Logo from "./assets/logo.svg"
import "./header.css";

const Header = () => {
  return (
    <Navbar collapseOnSelect={true} expand="xl" >
      <Navbar.Brand>
        <img src={Logo} alt="logotipo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end" >
        <Nav>
          <Nav.Link href="#"><Link to="/" >  Home </Link></Nav.Link>
          <Nav.Link href="#"><Link to="/objetivos" >Objetivos </Link></Nav.Link>
          <Nav.Link href="#"><Link to="/equipe" >Equipe </Link></Nav.Link>
          <Nav.Link href="#"><Link to="/Pesquisa" > Pesquisas </Link></Nav.Link>
          <Nav.Link href="#"><Link to="/atividades" > Atividades </Link></Nav.Link>
          <Nav.Link href="#"><Link to="/Contato" > Contato </Link></Nav.Link>
          <Nav.Link href="#"><Link to="/login" >  <Button className="siginButton" variant="primary" > Entrar </Button></Link></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}


export default Header;