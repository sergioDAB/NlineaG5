import React, { Component } from 'react';
import Ficha from './Ficha';

import fichaLocal from './images/circle-dark.svg';
import './css/tablero.css';

const FILAS =5;

class Tablero extends Component {
    constructor(){
        super();
        this.renderCell = this.renderCell.bind(this);
    }

    renderCell(fila, columna){
        return(
            <Ficha fila = {fila} columna = {columna} cardImg = {fichaLocal} key = {`ficha_${fila}_${columna}`}/>
        )
    }

    renderRows(){
        let rows = [];
        for(let i = 0; i < FILAS; i++){
            let columns = [];
            for(let j = 0; j < FILAS; j++){
                columns.push(this.renderCell(i, j));
            }
            rows.push(<tr>{columns}</tr>);
        }
        return rows;
    }

    render(){
        return(
            <div id="connect4" className="centerTable">
                <table className="tableroTable">
                    <tbody>
                    {this.renderRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Tablero;
