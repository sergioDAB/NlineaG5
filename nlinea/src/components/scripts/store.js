import {createStore} from 'redux';
import '../css/params.css';

let default_state = {
    size: 4,
    turno: -1,
    nlinea: 4,
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
    tablero:[],
    partidas:[]
};

const selector = (state, action) => {
    if(action.type === "CAMBIAR_TURNO"){
        return{
            ...state,
            turno: action.turno === 1 ? 0 : 1,
            tablero:action.tablero,
            userData1:{
                color:action.color1
            },
            userData2:{
                color:action.color2
            },
            nlinea:action.nlinea
        }
    }
    else if(action.type === "CONFIGURAR"){
        return{
            ...state,
            size: action.size,
            nlinea: action.nlinea,
            userData1: {
                color: action.userData1.color
            },
            userData2: {
                color: action.userData2.color
            },
            tablero:action.tablero
        }
    }
    else if(action.type ===  "NUEVA_PARTIDA"){
        return{
            ...state,
            partidas:action.partidas,
            view: action.view
        }
    }

    else if(action.type === "CAMBIAR_VISTA"){
        return{
            ...state,
            view: action.view
        }
    }
    else if(action.type === "HACER_TABLERO"){
        console.log("colores "+ action.color1+ "  "+action.color2);
        return{
            ...state,
            tablero:action.tablero,
            view: action.view,
            userData1:{
                color:action.color1
            },
            userData2:{
                color:action.color2
            },
            nlinea:action.nlinea
        }
    }

};

export default createStore(selector, default_state);