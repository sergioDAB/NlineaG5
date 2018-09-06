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
        this.color1=React.createRef();

        this.color2=React.createRef();
        this.linea = React.createRef();
        this.filas = React.createRef();
        this.dificultad = React.createRef();

        this.maketablero = this.maketablero.bind(this);
        this.renderRows=this.renderRows.bind(this);

        store.subscribe(()=>{
            this.setState({
                size: store.getState().size,
                linea: store.getState().nlinea,
                userData1: {
                    color1: store.getState().userData1.color
                },
                userData2: {
                    color2: store.getState().userData2.color
                },
                tablero:store.getState().tablero
                //view: store.getState().view
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
                <h2> Condiciones del juego </h2>

                <br/>
                <br/>
                <input  id="color1" ref={this.color1} placeholder="Tu color"/>
                <br/>
                <br/>
                <input  id="color2" ref={this.color2} placeholder="Pc color"/>
                <br/>
                <br/>
                <input id="linea"  ref={this.linea} placeholder="N para ganar"/>
                <br/>
                <br/>
                <input id="filas" ref={this.filas} placeholder=" Dimensiones"/>
                <br/>
                <br/>
                <select id="dificultad" ref={this.dificultad}>
                    <option value="facil">Facil</option>
                    <option value="medio">Medio</option>
                    <option value="dificil">Dificil</option>
                </select>
                <br/>
                <br/>
                <button onClick={this.maketablero}> Iniciar el juego</button>
                <br/><br/>
            </div>

        );
    }


    maketableroAPI(size,nlinea,color1,color2) {
        let url = 'http://localhost:3001/config';
        let data = {"size": size, "nlinea": nlinea, "color1": color1, "color2": color2};

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            cors: 'disabled',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => this.cambiarVista(response));
    }

    cambiarVista(res){
        this.setState({
            tablero: res.tablero,
            view: 'tablero'
        });

    }


    maketablero() {
        this.maketableroAPI(this.filas.current.value,this.linea.current.value,this.color1.current.value,this.color2.current.value); // crea el tablero en el api
        store.dispatch({
            type: "CONFIGURAR",
            size: this.filas.current.value,
            nlinea: this.linea.current.value,
            userData1: {
                color: this.color1.current.value
            },
            userData2 :{
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

