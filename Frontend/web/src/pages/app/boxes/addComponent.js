import React from 'react';

import './addComponent.css'

import add_desafios from '../assets/add_desafios.svg';
import add_escola from '../assets/add_escola.svg';
import add_jovemACE from '../assets/add_jovemACE.svg';
import add_pesquisador from '../assets/add_pesquisador.svg';
import add_prof_educacao from '../assets/add_prof_educacao.svg';
import add_prof_saude from '../assets/add_prof_saude.svg'
import add_professor from '../assets/add_professor.svg'

const opcoes = [
    {
        nome: "Escola",
        logo: add_escola
    },
    {
        nome: "Professor",
        logo: add_professor
    },
    {
        nome: "Jovem ACE",
        logo: add_jovemACE
    },
    {
        nome: "Profissional de Saúde",
        logo: add_prof_saude
    },
    {
        nome: "Profissional de Educação",
        logo: add_prof_educacao
    },
    {
        nome: "Pesquisador",
        logo: add_pesquisador
    },
    {
        nome: "Desafios",
        logo: add_desafios
    },
]
export default () => {
    return (
        <div id="addBlockBody">
            <h1 id="addBlockTitle"><strong>Indique o que deseja adicionar :</strong></h1>
            <div id="options">
                {opcoes.map(opcao => {
                    return (
                        <div id="addBlock" key={opcao.nome}>
                            <button id="addBlock" >
                                <img src={opcao.logo} alt={opcao.nome} />
                            </button>
                            <p><strong>{opcao.nome}</strong></p>
                        </div>
                    )
                }
            )}
        </div>
        </div>
    )
}