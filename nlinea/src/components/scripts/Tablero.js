import React, { Component } from 'react';
import Ficha from './Ficha';

import '../css/tablero.css';
import store from "./store.js";

let contJugadas=0;

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
            tablero: ["hola"],
            turno:0,
            level:"facil",
            win: false,

        };
        this.color1=React.createRef();
        this.color2=React.createRef();
        this.linea = React.createRef();
        this.filas = React.createRef();
        this.dificultad = React.createRef();

        this.maketablero = this.maketablero.bind(this);
        this.makeRevancha= this.makeRevancha.bind(this);
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
                tablero:store.getState().tablero,
                turno:store.getState().turno,
                view: store.getState().view,
                level:store.getState().level,
                win:store.getState().win
            });
        })
    }

    putFicha(fila, columna,color){
        return(
            <Ficha fila = {fila} columna = {columna}  key = {fila.toString().concat(columna.toString()) } color= {color}/>
        )
    }

    moverFichaAPIAutomatico(tab,turno,color1,color2,nlinea,level){
        let url = 'http://localhost:3001/automatico';
        let data = {"tablero": tab, "turno":turno,"color1":color1,"color2":color2, "nlinea":nlinea, "level":level};

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
            let itr=Math.random();
            rows.push(<tr key={itr}>{columns}</tr>);
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
                <label>Tu color</label>
                <input type="color" id="color1" ref={this.color1} defaultValue ="#33FF33"/>
                <br/>
                <br/>
                <label>PC color</label>
                <input  type="color" id="color2" ref={this.color2} defaultValue="#ff0000"/>
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
                <button className='button_pc' onClick={this.maketablero}> Iniciar el juego</button>
                <br/><br/>
            </div>

        );
    }


    maketableroAPI(size,nlinea,color1,color2,level) {
        let url = 'http://localhost:3001/config';
        let data = {"size": size, "nlinea": nlinea, "color1": color1, "color2": color2,"level":level};

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
            .then(response => store.dispatch({
                type:"HACER_TABLERO",
                tablero: response.tablero,
                view:'tablero',
                color1: response.color1,
                color2:response.color2,
                nlinea:response.nlinea,
                level: response.level,
                win:false
            }));

    }


    maketablero() {
        this.maketableroAPI(this.filas.current.value,
            this.linea.current.value,
            this.color1.current.value,
            this.color2.current.value,
            this.dificultad.current.value); // crea el tablero en el api
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

    // revancha con las mismas condiciones de juego contra la computadora

    makeRevancha() {
        this.maketableroAPI(this.state.size,
            this.state.linea,
            this.state.userData1.color1,
            this.state.userData2.color2,
            this.state.level); // crea el tablero en el api
    }
// vista que muestra el tablero
    renderTab(){

        if(!this.state.win){
            if(this.state.turno===1){
                if(contJugadas===0){
                    console.log("juega la pc");
                    contJugadas+=1;
                    this.moverFichaAPIAutomatico(
                        this.state.tablero,
                        this.state.turno,
                        this.state.userData1.color1,
                        this.state.userData2.color2,
                        this.state.linea,
                        this.state.level);
                }
            }else{
                contJugadas=0;
            }
            return(
                <table className="tableroTable">
                    <tbody>
                    {this.renderRows(this.state.size)}
                    </tbody>
                </table>
            );

        }else{
            return(
                <div>
                    <div>
                        <h3> Felicitaciones !!! </h3>
                        <button className='button_unirme' onClick={this.makeRevancha}> Revancha </button>
                        <button className='button_pc'> Volver al inicio</button>
                        <br/>
                        <br/>
                    </div>
                    <table className="tableroTable">
                        <tbody>
                        {this.renderRows(this.state.size)}
                        </tbody>
                    </table>
                </div>

            );
        }

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

