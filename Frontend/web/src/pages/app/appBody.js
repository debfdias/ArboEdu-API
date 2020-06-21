import React, { Component } from 'react';
import AppHeader from './header';
import Sidebar from './sidebar';
//import './appBody.css';

export default class AppBody extends Component {
    render() {
        return (
            <div id="fullBody">
                <AppHeader/>
                <div id="body">
                    <Sidebar type="admin"/>
                    </div>
                    </div>
        );
    };
}