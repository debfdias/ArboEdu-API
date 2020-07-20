import React from 'react';

import './addComponent.css'

import edit_desafios from '../assets/edit_desafios.svg';
import edit_escola from '../assets/edit_escola.svg';
import edit_jovemACE from '../assets/edit_jovemACE.svg';
import edit_pesquisador from '../assets/edit_pesquisador.svg';
import edit_prof_educacao from '../assets/edit_prof_educacao.svg';
import edit_prof_saude from '../assets/edit_prof_saude.svg'
import edit_professor from '../assets/edit_professor.svg'

const opcoes = [
    {
        nome: "Escola",
        logo: edit_escola
    },
    {
        nome: "Professor",
        logo: edit_professor
    },
    {
        nome: "Jovem ACE",
        logo: edit_jovemACE
    },
    {
        nome: "Profissional de Saúde",
        logo: edit_prof_saude
    },
    {
        nome: "Profissional de Educação",
        logo: edit_prof_educacao
    },
    {
        nome: "Pesquisador",
        logo: edit_pesquisador
    },
    {
        nome: "Desafios",
        logo: edit_desafios
    },
]
export default () => {
    return (
        <div id="addBlockBody">
            <h1 id="addBlockTitle"><strong>Indique o que deseja editar :</strong></h1>
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