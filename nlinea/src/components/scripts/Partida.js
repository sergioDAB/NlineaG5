import React, { Component } from 'react';

import "../css/partida.css";
import store from "./store";

class Partida extends Component {
    constructor(props){
        super(props);
        this.state={
            creador: "creador",
            size: "size",
            nlinea: "nlinea",
            solicitada: false,
            aceptada:false
        };

    }

    goParametros(){
        store.dispatch({
            type: "CAMBIAR_VISTA",
            view: 'tablero'
        })
    }


    render() {

        return <div className="partida" key={this.props.categoria+this.props.creador}>

            <label>creador:   {this.props.creador}</label>
            <label>size:  {this.props.size}</label>
            <label>nlinea:  {this.props.nlinea}</label>
            <label>categoria:  {this.props.categoria}</label>
            <button onClick={this.goParametros} className='button_unirme'>Unirme</button>

        </div>

    }

}

export default Partida;