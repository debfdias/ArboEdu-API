import React, { Component } from 'react';
import AppHeader from './header';
import Sidebar from './sidebar';
import './appBody.css';


import welcomeBox from './boxes/welcomeBox'
import addComponent from './boxes/addComponent'
import editComponent from './boxes/editComponent'

export default class AppBody extends Component {
    constructor(props) {
        super(props);
        this.state = { perfil: "Administrador" }
    }

    render() {

        return (
            <div id="fullBody">
                <AppHeader />
                <div id="body">
                    <Sidebar type={this.state.perfil}/>
                    {welcomeBox(this.state.perfil)}
                    {/*editComponent()*/}
                </div>

            </div>
        );
    };
}

