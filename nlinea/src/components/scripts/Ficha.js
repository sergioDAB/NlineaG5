import React, { Component } from 'react';

import store from "./store.js";

import '../css/ficha.css';


class Ficha extends Component {

    constructor(){
        super();
        this.button = React.createRef();
        this.onClick = this.onClick.bind(this);
        this.state={
            color: store.getState().userData1.color,
            turno: store.getState().turno,
            tamano: store.getState().size,
            userData1: {
                nickname: store.getState().userData1.nickname,
                level: store.getState().userData1.level,
                color: store.getState().userData1.color
            },
            userData2: {
                nickname: store.getState().userData2.nickname,
                level: store.getState().userData2.level,
                color: store.getState().userData2.color
            },
            tablero:store.getState().tablero,
            nlinea:store.getState().nlinea,
            win:store.getState().win
        };

        store.subscribe(()=>{
            this.setState({
                color: store.getState().turno===0? this.state.userData1.color : this.state.userData2.color,
                size: store.getState().size,
                userData1: {
                    nickname: store.getState().userData1.nickname,
                    level: store.getState().userData1.level,
                    color: store.getState().userData1.color
                },
                userData2: {
                    nickname: store.getState().userData2.nickname,
                    level: store.getState().userData2.level,
                    color: store.getState().userData2.color
                },
                tablero: store.getState().tablero,
                nlinea:store.getState().nlinea,
                win:store.getState().win
            });
        })

    }

    calcularTamFicha(){
        let t=510/this.state.tamano;
        return t;
    }

    moverFichaAPI(fila,columna,tablero,turno,color1,color2,nlinea){
        let url = 'http://localhost:3001/game';
        let data = {"fila": fila, "columna":columna,"tablero":tablero, "turno":turno,"color1":color1, "color2":color2,"nlinea":nlinea};

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            cors: 'disabled',
            credentials: 'same-origin',
            headers:{'Content-Type': 'application/json'}

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response =>store.dispatch({ // cambia el store
                type: "CAMBIAR_TURNO",
                turno: response.turno,
                tablero:response.tablero,
                color1: response.color1,
                color2:response.color2,
                nlinea:response.nlinea,
                win:response.win
            }) )

    }

    onClick(){
        console.log(" me presionaron: ", this.state.win);
        if(this.state.win=== true){
            // no hace ninguna accion luego de que haya un ganador
            alert("no sea necio -.-");

        }else{
            this.moverFichaAPI(this.props.fila,
                this.props.columna,
                store.getState().tablero,
                store.getState().turno,
                store.getState().userData1.color,
                store.getState().userData2.color,
                store.getState().nlinea);
        }
    }


    render() {
        return (
            <div
                ref= {this.button }
                className="ficha"
                onClick = {this.onClick}
                style={{
                    backgroundColor: `${this.props.color}`,
                    height: this.calcularTamFicha(),
                    width:this.calcularTamFicha()
                }}>
            </div>
        );
    }
}


export default Ficha;
