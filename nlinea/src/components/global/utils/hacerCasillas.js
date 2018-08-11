import React , {Component} from 'react';

import fichaLocal from '../images/circle-dark.svg';


const NUMERO_DE_CASILLAS = 5;

export default ()=>{

    let casillas=[];
    let x=0;
    let y=0;

    while(x < NUMERO_DE_CASILLAS){
        while(y < NUMERO_DE_CASILLAS){
            const casilla ={
                icono: "vacio",
                movimientoValido: false,
                x: x,
                y: y
            };
            casillas.push(casilla);
            y++;


        }
        x++;
        y=0;
    };


    return casillas;
};