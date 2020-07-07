import React, { Component } from 'react';
import './sidebar.css';
import sidebar from "./sidebarItems.json"

function setType(type) {
    switch (type) {
        case ("Administrador"):
            return sidebar.admin;

        case ("Professor"):
            return sidebar.teacher;

        case ("Jovem ACE"):
            return sidebar.ace;

        default:
            return sidebar.ace;

    };
}
export default class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const sidebarType = setType(this.props.type);
        return (
            <React.Fragment>
                <div id="sidebar">
                    <div id="sidebar-type">
                        <img src={sidebarType.logo} alt={sidebarType.name}></img>
                        <span id="sidebar-label">{sidebarType.name}</span>
                    </div>
                    <div id="sidebar-menu">
                        <div id="sidebar-icons">
                            {sidebarType.items.map(item => (
                                <a href="#" key={item.name}>
                                    <img src={item.logo} alt={item.name} key={item.name} />
                                </a>
                            ))}
                        </div>
                        <div id="sidebar-label">
                            {sidebarType.items.map(item => (
                                <a href="#" key={item.name}>
                                    <div id="sidebar-label-item" key={item.name}>
                                        <p ><strong>{item.name}</strong></p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}