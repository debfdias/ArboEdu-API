import React from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Logo from "./assets/logo.svg"
import "./header.css";

const Header = () => {
  return (
    <Navbar  collapseOnSelect expand="lg" >
      <Navbar.Brand>
        <img src={Logo} alt="logotipo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse  className="justify-content-end" >
        <Nav>
          <Nav.Item><Link to="/" >  Home </Link></Nav.Item>
          <Nav.Item><Link to="/objetivos" >Objetivos </Link></Nav.Item>
          <Nav.Item><Link to="/equipe" >Equipe </Link></Nav.Item>
          <Nav.Item><Link to="/Pesquisa" > Pesquisas </Link></Nav.Item>
          <Nav.Item><Link to="/atividades" > Atividades </Link></Nav.Item>
          <Nav.Item><Link to="/Contato" > Contato </Link></Nav.Item>
          <Nav.Item><Link to="/login" >  <Button className="siginButton" variant="primary" > Entrar </Button></Link></Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}


export default Header;