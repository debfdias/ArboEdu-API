import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/home/home.js";
import Cadastro from "./pages/cadastro/cadastro.js"
import Login from "./pages/login.js"

import AppBody from './pages/app/appBody';
import Sidebar from "./pages/app/sidebar.js";


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" 
          render={(props) => <Home {...props} name=""/>}
         />

        <Route path="/objetivos" 
          render={(props) => <Home {...props} name="objetivos"/>}
         />

        <Route path="/equipe" 
          render={(props) => <Home {...props} name="equipe"/>}
         />

        <Route path="/pesquisa" 
          render={(props) => <Home {...props} name="pesquisa"/>}
         />

        <Route path="/atividades" 
          render={(props) => <Home {...props} name="atividades"/>}
         />

        <Route  path="/contato" 
          render={(props) => <Home {...props} name="contato"/>}
         />
        <Route path="/cadastro" component={Cadastro}/>
        <Route path="/login" component={Login}/>
        <Route path="/app" component={AppBody}/>
        <Route  path="/sidebar" 
          render={(props) => <Sidebar {...props} type="admin"/>}
         />
      </Switch>{" "}
    </BrowserRouter>
  );
};

export default Routes;
