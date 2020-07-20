import addComponent from './boxes/addComponent'
import editComponent from './boxes/editComponent'

const sidebarItems = {
    "admin": {
        "name": "Administrador",
        "logo": "./assets/adminIcon.svg",
        "items": [
            {
                "name": "Adicionar Componentes",
                "logo": "./assets/adicionar.svg",
                "component": addComponent
            },
            {
                "name": "Editar Componentes",
                "logo": "./assets/editar.svg",
                "component": editComponent
            },
            {
                "name": "Aprovar Atividades",
                "logo": "./assets/visto.svg"
            },
            {
                "name": "Notificações",
                "logo": "./assets/notification.svg"
            },
            {
                "name": "Consultar Ranking",
                "logo": "./assets/bar-chart.svg"
            },
            {
                "name": "Consultar Indicadores",
                "logo": "./assets/indicators.svg"
            }
        ]
    },
    "teacher": {
        "name": "Professor",
        "logo": "./assets/professor.svg",
        "items": [
            {
                "name": "Acompanhamento",
                "logo": "./assets/adicionar.svg"
            },
            {
                "name": "Aprovar Atividades",
                "logo": "./assets/editar.svg"
            },
            {
                "name": "Notificações",
                "logo": "./assets/notification.svg"
            },
            {
                "name": "Consultar Ranking",
                "logo": "./assets/bar-chart.svg"
            },
            {
                "name": "Consultar Indicadores",
                "logo": "./assets/indicators.svg"
            }
        ]
    },
    "ace":{
        "name": "Jovem ACE",
        "logo": "./assets/jovemAce.svg",
        "items":[
            {
                "name":"Notificações",
                "logo": "./assets/notification.svg"
            },
            {
                "name": "Consultar Ranking",
                "logo": "./assets/bar-chart.svg"
            },
            {
                "name": "Consultar Indicadores",
                "logo": "./assets/indicators.svg"
            }
        ]
    }
}

export default sidebarItems