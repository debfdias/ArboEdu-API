import React, { Component } from 'react';
import AppHeader from './header';

import './appBody.css';
export default class AppBody extends Component {
    render() {
        return (
            <div id="fullBody">
                <AppHeader />
                <div id="body">
                    <h1>Esse é o corpo do aplicativo</h1>

                </div>
            </div>
        );
    };
}