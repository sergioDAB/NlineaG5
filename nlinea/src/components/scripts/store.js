import {createStore} from 'redux';
import '../css/params.css';

let default_state = {
    size: 4,
    turno: -1,
    nline: 4,
    userData1: {
        nickname: "player1",
        level: 1,
        color: "green"
                },
    userData2: {
        nickname: "player2",
        level: 1,
        color: "red"
    },
    view: 'partidas',
    tablero:[]
};

const selector = (state, action) => {
    if(action.type === "CAMBIAR_TURNO"){
        return{
            ...state,
            turno: action.turno === 1 ? 0 : 1,
            tablero:action.tablero
        }
    }
    else if(action.type === "CONFIGURAR"){
        return{
            ...state,
            size: action.size,
            nline: action.nline,
            userData1: {
                color: action.userData1.color
            },
            userData2: {
                color: action.userData2.color
            },
            tablero:action.tablero
        }
    }
    else if(action.type ===  "MODIFICAR_PERFIL"){
        return{
            ...state,
            userData: {
                nickname: action.userData.nickname,
                level: action.userData.level,
                color: action.userData.color
            }
        }
    }

    else if(action.type === "CAMBIAR_VISTA"){
        return{
            ...state,
            view: action.view
        }
    }





};

export default createStore(selector, default_state);