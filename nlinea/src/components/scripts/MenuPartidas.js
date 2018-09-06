import React ,{ Component } from 'react';

import Partida from './Partida';
import '../css/partida.css';
import store from "./store";


class Partidas extends Component {


    renderPartidas(){
        return(
            <div>
                {this.renderPartida(5)}

                <button className='button_crear_partida'> Crear una nueva partida </button>
                <button onClick={this.goParametros} className='button_pc'> Jugar contra la PC </button>
            </div>
        )
    }

    goParametros(){
        console.log("el boton fue presionado");
        store.dispatch({
            type: "CAMBIAR_VISTA",
            view: 'parametros'
        })
    }



// en esta funcion es donde se le debe dar el valor a cada una de las partidas

    renderPartida(partidas) {
        let rows = [];
        for (let i = 0; i < partidas; i++) {
            rows.push(<Partida creador="sergio" size={i} nlinea={i+1}/>)
        }
        return rows;
    }


    render() {

        return <div>
            {this.renderPartidas()}

        </div>

    }

}

export default Partidas;

