import React, { Component } from 'react';

import store from "./store.js";

import '../css/ficha.css';



class Ficha extends Component {

    constructor(){
        super();
        this.button = React.createRef();
        this.pintar = this.pintar.bind( this );
        this.onClick = this.onClick.bind(this);
        this.state={
            img:"ficha",
            color: store.getState().userData1.color,
            t: 0,
            userData1: {
                nickname: store.getState().userData1.nickname,
                level: store.getState().userData1.level,
                color: store.getState().userData1.color
            },
            userData2: {
                nickname: store.getState().userData2.nickname,
                level: store.getState().userData2.level,
                color: store.getState().userData2.color
            }
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
                }
            })
        })

    }

    pintar(){
        store.dispatch({type: "CAMBIAR_TURNO"});
        console.log(store.getState().turno);

        //se necesita pintar la ficha que se desee por coordenada aunque no sea a la que se le da click


        this.button.current.style.backgroundColor = this.state.color;

    }

    onClick(){
        console.log(`${this.props.fila}-${this.props.columna}`);
        this.pintar(this.props.fila, this.props.columna);
        console.log("fichas"+ store.getState().size);
    }



    render() {

        return (
            <div ref= {this.button } className={this.state.img}  onClick = {this.onClick}>
            </div>
        );
    }
}

export default Ficha;

//style={{backgroundColor: `${this.state.color}`}}