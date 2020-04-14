import React, {Component} from 'react';

import './home.css';
import Header from './header.js'

export default class Home extends Component{
    render(){
        return(
            <React.Fragment>
            <Header/>
            <h1>Essa é a página principal</h1>
            </React.Fragment>
        );
    }
}