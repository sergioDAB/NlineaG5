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
        console.log("el boton fue presionado");
        store.dispatch({
            type: "CAMBIAR_VISTA",
            view: 'parametros'
        })
    }


    render() {

        return <div className="partida">

            <label>creador:   {this.props.creador}</label>
            <label>size:  {this.props.size}</label>
            <label>nlinea:  {this.props.nlinea}</label>
            <button onClick={this.goParametros} className='button_unirme'>Unirme</button>

        </div>

    }

}

export default Partida;