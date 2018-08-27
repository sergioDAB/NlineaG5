import React, { Component } from 'react';
import Ficha from './Ficha';

import '../css/tablero.css';
import store from "./store.js";


class Tablero extends Component {
    constructor(){
        super();
        this.state= {
            size: 2,
            userData1: {
                nickname1: "player1",
                level1: 1,
                color1: "green"
            },
            userData2: {
                nickname2: "player2",
                level2: 1,
                color2: "red"
            },
            linea: 4,
            view: 'parametros', // parametros  tablero
            tablero: ["hola"]
        };
        this.nick1 = React.createRef();
        this.categoria1 = React.createRef();
        this.color1=React.createRef();
        this.nick2 = React.createRef();
        this.categoria2 = React.createRef();
        this.color2=React.createRef();
        this.linea = React.createRef();
        this.filas = React.createRef();

        this.maketablero = this.maketablero.bind(this);
        this.renderRows=this.renderRows.bind(this);

        store.subscribe(()=>{
            this.setState({
                size: store.getState().size,
                linea: store.getState().nlinea,
                userData1: {
                    nickname1: store.getState().userData1.nickname,
                    level1: store.getState().userData1.level,
                    color1: store.getState().userData1.color
                },
                userData2: {
                    nickname2: store.getState().userData2.nickname,
                    level2: store.getState().userData2.level,
                    color2: store.getState().userData2.color
                },
                tablero:store.getState().tablero,
                view: store.getState().view
            });
        })
    }

    putFicha(fila, columna,color){
        return(
            <Ficha fila = {fila} columna = {columna}  key = {fila.toString()+columna.toString() } color= {color}/>
        )
    }


    renderRows(filas) {
        console.log(this.state.tablero);
        let rows = [];
        for (let i = 0; i < filas; i++) {
            let columns = [];
            for (let j = 0; j < filas; j++) {
                if (this.state.tablero[i][j].fila === i && this.state.tablero[i][j].columna === j) {
                    columns.push(this.putFicha(j, i, this.state.tablero[j][i].color))
                }
            }
            rows.push(<tr>{columns}</tr>);
        }
        return rows;
    }

    renderParams() {
        return (
            <div className="datos">
                <br/>

                <div className="player1">
                    <h2>Player 1</h2>
                    <input id="nick1" ref={this.nick1} placeholder="nickname"/>
                    <br/>
                    <br/>
                    <input  id="categoria1" ref={this.categoria1} placeholder="categoria"/>
                    <br/>
                    <br/>
                    <input  id="color1" ref={this.color1} placeholder="color"/>
                </div>
                <div className="player2">
                    <h2>Player 2</h2>
                    <input id="nick2" ref={this.nick2} placeholder="nickname"/>
                    <br/>
                    <br/>
                    <input  id="categoria2" ref={this.categoria2} placeholder="categoria"/>
                    <br/>
                    <br/>
                    <input  id="color2" ref={this.color2} placeholder="color"/>
                </div>

                <br/>
                <br/>
                <input id="linea"  ref={this.linea} placeholder="N para ganar"/>
                <br/>
                <br/>
                <input id="filas" ref={this.filas} placeholder=" Dimensiones"/>
                <br/>
                <br/>
                <button onClick={this.maketablero}> make</button>
                <br/>
            </div>

        );
    }


    maketableroAPI(size,nlinea,color1,color2){
        let url = 'http://localhost:3001/config';
        let data = {"size": size, "nlinea": nlinea, "color1":color1, "color2": color2};

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            cors: 'disabled',
            credentials: 'same-origin',
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => this.setState({
                tablero:response.tablero,
                view: 'tablero'
            }))
    }

    maketablero() {
        this.maketableroAPI(this.filas.current.value,this.linea.current.value,this.color1.current.value,this.color2.current.value); // crea el tablero en el api
        store.dispatch({
            type: "CONFIGURAR",
            size: this.filas.current.value,
            nlinea: this.linea.current.value,
            userData1: {
                nickname: this.nick1.current.value,
                level: this.categoria1.current.value,
                color: this.color1.current.value
            },
            userData2 :{
                nickname: this.nick2.current.value,
                level: this.categoria2.current.value,
                color: this.color2.current.value
            }
        });
    }
// vista que muestra el tablero
    renderTab(){
        return(
            <table className="tableroTable">
                <tbody>
                {this.renderRows(this.state.size)}
                </tbody>
            </table>
        )
    }

// define cual componente renderizar
    renderComponent(){
        if(this.state.view==='parametros'){
            return(this.renderParams())
        }else if(this.state.view==='tablero'){
            return(this.renderTab())
        }
    }


    render(){
        return(
            <div className="centerTable">
                {this.renderComponent()}
            </div>
        )
    }
}

export default Tablero;

