import React ,{ Component } from 'react';

import Partida from './Partida';
import '../css/partida.css';


class Partidas extends Component {


    renderPartidas(){
        return(
            <div>
                {this.renderPartida(5)}

                <button> Crear una nueva partida </button>
            </div>
        )
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

