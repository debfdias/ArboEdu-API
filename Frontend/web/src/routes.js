import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/home/home.js";
import Contato from "./pages/contato/contato.js";
import Objetivos from "./pages/objetivos/objetivos.js";
import Pesquisa from "./pages/pesquisa/pesquisa.js";
import Atividades from "./pages/atividades/atividades.js";
import Equipe from "./pages/equipe/equipe.js";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />{" "}
        <Route path="/objetivos/" component={Objetivos} />{" "}
        <Route path="/equipe/" component={Equipe} />{" "}
        <Route path="/pesquisa/" component={Pesquisa} />{" "}
        <Route path="/atividades/" component={Atividades} />{" "}
        <Route path="/contato/" component={Contato} />{" "}
      </Switch>{" "}
    </BrowserRouter>
  );
};

export default Routes;
