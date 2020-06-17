import React, { Component } from 'react';
import AppHeader from './header';

import './appBody.css';
import Adicionar from './assets/adicionar.svg';
import Barchart from './assets/bar-chart.svg';
import Editar from './assets/editar.svg';
import Notificacao from './assets/notification.svg';
import Visto from './assets/visto.svg';
import AdminLogo from './assets/adminIcon.svg'
export default class AppBody extends Component {
    render() {
        return (
            <div id="fullBody">
                <AppHeader/>
                <div id="body">
                    <div id="sidebar">
                        <ul>
                            <li className="disabled">
                                <img src={AdminLogo} alt="AdmIcon"></img>
                                <strong>Administrador</strong>
                            </li>
                            <li className="enabled">
                                <img src={Adicionar} alt="AddIcon"></img>
                                <strong>Adicionar Componentes</strong>
                            </li>
                            <li className="enabled">
                                <img src={Editar} alt="EditIcon"></img>
                                <strong>Editar Componentes</strong>
                            </li>
                            <li className="enabled">
                                <img src={Visto} alt="CheckIcon"></img>
                                <strong>Aprovar Atividades</strong>
                            </li>
                            <li className="enabled" >
                                <img src={Notificacao} alt="NotificationIcon"></img>
                                <strong>Notificações</strong>
                            </li>
                            <li className="enabled" >
                                <img src={Barchart} alt="BarchartIcon"></img>
                                <strong>Consultar Ranking</strong>
                            </li>
                            <li className="enabled">
                                <img src={Barchart} alt="IndicatorsIcon"></img>
                                <strong>Consultar Indicadores</strong>
                            </li>
                        </ul>
                    </div>
                    <div id="interface">
                        <div id="box-admin">
                            <h1>Bem-Vindo ao <b>Arboedu.web!</b></h1>
                            <p>
                                <b>Caro Administrador,</b><br/>
                                Este é um estudo piloto que faz parte de uma pesquisa sobre o uso
                                de dispositivos móveis para execução de ações educativas visando à mudança
                                de comportamento da população em relação à prevenção de arboviroses,
                                como a Dengue, Zika e Chikungunya.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}