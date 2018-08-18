import {createStore} from 'redux';
import '../css/params.css';

let default_state = {
    size: 4,
    turno: 0,
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
    view: 'main',
    fila: 0,
    columna:0
};

const selector = (state, action) => {
    if(action.type === "CAMBIAR_TURNO"){
        return{
            ...state,
            turno: state.turno === 0 ? 1 : 0
        }
    }
    else if(action.type === "CONFIGURAR"){
        return{
            ...state,
            size: action.size,
            nline: action.nline,
            userData1: {
                nickname: action.userData1.nickname,
                level: action.userData1.level,
                color: action.userData1.color
            },
            userData2: {
                nickname: action.userData2.nickname,
                level: action.userData2.level,
                color: action.userData2.color
            }
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

    else if(action.type === "LOGIN"){
        return{
            ...state,
            view: 'login'
        }
    }

    else if(action.type === 'PERFIL'){
        return{
            ...state,
            view: 'perfil'
        }
    }
    else if(action.type === 'TABLERO'){
        return{
            ...state,
            view: 'tablero'
        }
    }



};

export default createStore(selector, default_state);