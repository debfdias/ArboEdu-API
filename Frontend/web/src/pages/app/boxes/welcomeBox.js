import React from 'react';


function welcomeBox(type) {
    return (
        <React.Fragment>
            <div id="welcomeBox">
                <div id="#welcomeBox-h1Div"><h1>Bem-Vindo ao <b>Arboedu</b>.web!</h1></div>
                <div><p><b>Caro {type},</b></p>
                    <p>Este é um estudo piloto que faz parte de uma pesquisa sobre
                    o uso de dispositivos móveis para execução de ações educativas
                    visando à mudança da população em relação à prevenção de aboviroses,
                    como a Dengue, Zika e Chikungunya
                </p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default welcomeBox