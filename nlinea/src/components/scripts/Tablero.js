import React, { Component } from 'react';
import Ficha from './Ficha';

import '../css/tablero.css';
import store from "./store";



class Tablero extends Component {
    constructor(props){
        super(props);
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
            view: 'parametros',
            fila: 3,
            columna: 3,
            colorActual: "orange",
            pintadas:[]
        }
        ;
        this.nick1 = React.createRef();
        this.categoria1 = React.createRef();
        this.color1=React.createRef();
        this.nick2 = React.createRef();
        this.categoria2 = React.createRef();
        this.color2=React.createRef();
        this.linea = React.createRef();
        this.filas = React.createRef();

        this.maketablero = this.maketablero.bind(this);
        this.renderCell = this.renderCell.bind(this);
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
                fila: store.getState().fila,
                columna:store.getState().columna,
                colorActual:store.getState().colorActual,

            });

        })
    }


    renderCell(fila, columna){ // ficha vacia
        return(
            <Ficha fila = {fila} columna = {columna}  key = {fila.toString()+columna.toString()}/>
        )
    }

    putFicha(fila, columna){
        return(
            <Ficha fila = {fila} columna = {columna}  key = {fila.toString()+columna.toString() } color= {this.state.colorActual}/>
        )
    }

    member(ficha){
        let len= this.state.pintadas.length;
        for(let i=0; i<len;i++){
            if(this.state.pintadas[i]===ficha){
                return true;
            }
        }
        return false;
    }

    renderRows(filas){
        let rows = [];
        for(let i = 0; i < filas; i++){
            let columns = [];
            for(let j = 0; j < filas; j++){

                if(this.state.fila=== i && this.state.columna===j){
                    columns.push(this.putFicha(j,i))
                }else{
                    columns.push(this.renderCell(j,i));
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

    maketableroAPI(size,nlinea){
        let url = 'http://localhost:3001/config';
        let data = {"size": size, "nlinea": nlinea};

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
            .then(response => console.log('Success:', response));
    }

    maketablero() {
        this.maketableroAPI(this.filas.current.value,this.linea.current.value); // crea el tablero en el api
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

        this.setState({
            view: 'tablero'
        });

    }

    renderTab(){
        return(
            <table className="tableroTable">
                <tbody>
                {this.renderRows(this.state.size)}
                </tbody>
            </table>
        )

    }

    renderComponent(){
        if(this.state.view==='parametros'){
            return(this.renderParams())
        }else{
            return(this.renderTab())
        }
    }


    render(){
        console.log("se reendiza");
        return(
            <div className="centerTable">
                {this.renderComponent()}
            </div>
        )
    }
}

export default Tablero;
