import React, { Component } from 'react';

class Parametro extends Component {

    render() {
        return (
            <div>
                <input placeholder="nombre"/>
                <br/>
                <input placeholder="apellido"/>
                <br/>
                <input placeholder="lineas"/>
                <br/>
                <a href="http://localhost:3000/tablero">Hacer tablero</a>

            </div>
        );
    }


}

export default Parametro;