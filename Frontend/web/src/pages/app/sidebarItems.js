import addComponent from './boxes/addComponent'
import editComponent from './boxes/editComponent'
import adminIcon from './assets/adminIcon.svg';
import adicionar from './assets/adicionar.svg';
import editar from './assets/editar.svg';
import visto from './assets/visto.svg';
import notification from './assets/notification.svg';
import bar_chart from './assets/bar_chart.svg';
import indicators from './assets/indicators.svg';
import professor from './assets/professor.svg';
import jovemAce from './assets/jovemAce.svg';

const sidebarItems = {
    "admin": {
        "name": "Administrador",
        "logo": adminIcon,
        "items": [
            {
                "name": "Adicionar Componentes",
                "logo": adicionar,
                "component": addComponent
            },
            {
                "name": "Editar Componentes",
                "logo": editar,
                "component": editComponent
            },
            {
                "name": "Aprovar Atividades",
                "logo": visto
            },
            {
                "name": "Notificações",
                "logo": notification
            },
            {
                "name": "Consultar Ranking",
                "logo": bar_chart
            },
            {
                "name": "Consultar Indicadores",
                "logo": indicators
            }
        ]
    },
    "teacher": {
        "name": "Professor",
        "logo": professor,
        "items": [
            {
                "name": "Acompanhamento",
                "logo": adicionar
            },
            {
                "name": "Aprovar Atividades",
                "logo": visto
            },
            {
                "name": "Notificações",
                "logo": notification
            },
            {
                "name": "Consultar Ranking",
                "logo": bar_chart
            },
            {
                "name": "Consultar Indicadores",
                "logo": indicators
            }
        ]
    },
    "ace":{
        "name": "Jovem ACE",
        "logo": jovemAce,
        "items":[
            {
                "name":"Notificações",
                "logo": notification
            },
            {
                "name": "Consultar Ranking",
                "logo": bar_chart
            },
            {
                "name": "Consultar Indicadores",
                "logo": indicators
            }
        ]
    }
}

export default sidebarItems