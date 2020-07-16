import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './home.css';
import Header from './header.js'

export default class Home extends Component{
    render(){
        return(
            <React.Fragment>
                <Header/>
                <Container>
                    <Row className="recuo">
                        <div className='titulo'>
                            <Col xs={12} md={12} lg={12}><p>Bem-Vindo!</p></Col>
                        </div>
                        <div className='corpo'>
                            <Col xs={6} md={6} lg={4}>Este é um estudo piloto que faz parte de uma pesquisa sobre o uso de dispositivos móveis para 
                            execução de ações educativas visando à mudaça de comportamento da população em relação à prevenção 
                            de arboviroses, como a Dengue, Zika e Chikungunya.</Col>
                        </div>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}
