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
            fila: store.getState().fila,
            columna:store.getState().columna
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
                fila: store.getState().fila,
                columna:store.getState().columna
            });
        })

    }

    calcularTamFicha(){
        let t=510/this.state.tamano;
        return t;
    }

    moverFichaAPI(fila,columna,turno){
        console.log("fila: "+ fila + "  columna:"+columna);
        let url = 'http://localhost:3001/game';
        let data = {"fila": fila, "columna":columna, "turno":turno};

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
                fila: response.columna,
                columna: response.fila,
                turno: response.turno,
                colorActual:this.state.color // color que varia segun sea el turno
            }) ).then(res => console.log(res))
    }

    onClick(){
        this.moverFichaAPI(this.props.fila,this.props.columna,store.getState().turno);

    }



    render() {
        console.log("renderiza f");
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

//style={{backgroundColor: `${this.state.color}`}}