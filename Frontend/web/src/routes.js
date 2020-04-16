  
import React from 'react';

import {BrowserRouter,Switch,Route} from 'react-router-dom';

import Home from './pages/home/home.js';
import Cadastro from './pages/cadastro/cadastro.js';

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/cadastro' component={Cadastro} />

            </Switch>
        </BrowserRouter>   
    );
}

export default Routes;