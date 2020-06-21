import React, { Component } from 'react';
import './sidebar.css';
import sidebar from "./sidebarItems.json"

function setType(type) {
    switch (type) {
        case ("admin"):
            return sidebar.admin;

        case ("teacher"):
            return sidebar.teacher;

        case ("ace"):
            return sidebar.ace;

        default:
            return sidebar.ace;

    };
}
export default class Sidebar extends Component {

    render() {
        const sidebarType = setType(this.props.type);
        return (
            <div id="sidebar">
                <div id="sidebar-type">
                    <img src={sidebarType.logo} alt={sidebarType.name}></img>
                    <span id="sidebar-label">{sidebarType.name}</span>
                </div>
                <div id="sidebar-menu">
                    <div id="sidebar-icons">
                        {sidebarType.items.map(item => (
                            <a href="#">
                                <img src={item.logo} alt={item.name} key={item.name} />
                            </a>
                        ))}
                    </div>
                    <div id="sidebar-label">
                        {sidebarType.items.map(item => (
                            <a href="#">
                                <div id="sidebar-label-item" key={item.name}>
                                    <p key={item.name}><strong>{item.name}</strong></p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

        );
    }
}