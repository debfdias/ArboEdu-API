import React from "react";
import { Link } from "react-router-dom";

import "./header.css";

const Header = () => {
  return (
    <header id="home-header">
      <Link to="/home"> Home </Link>
      <Link to="/objetivos"> Objetivos </Link>{" "}
      <Link to="/equipe"> Equipe </Link>
      <Link to="/pesquisa"> Pesquisa </Link>{" "}
      <Link to="/atividades"> Atividades </Link>{" "}
      <Link to="/contato"> Contato </Link>{" "}
      <Link to="/cadastro">
        <button id="entrar"> Entrar </button>{" "}
      </Link>{" "}
    </header>
  );
};

export default Header;
