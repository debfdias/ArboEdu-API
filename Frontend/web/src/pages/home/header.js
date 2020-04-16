import React from "react";
import { Link } from "react-router-dom";

import "./header.css";

const Header = () => {
  return (
    <header id="home-header">
      <Link to="/"> Home </Link> <Link to="/objetivos"> Objetivos </Link>{" "}
      <Link to="/equipe"> Equipe </Link> <Link to="/pesquisa"> Pesquisa </Link>{" "}
      <Link to="/atividades"> Atividades </Link>{" "}
      <Link to="/contato"> Contato </Link>{" "}
      <button id="sign in"> Entrar </button>{" "}
    </header>
  );
};

export default Header;
