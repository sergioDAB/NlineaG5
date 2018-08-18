import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Tablero from "./Tablero";

import '../css/App.css';



class App extends Component {
    render() {
        return <div className="App">

            <header className="App-header">
                <h1 className="App-title">Bienvenido a N en linea</h1>

                <a >algo</a>
                <a>algo</a>
                <a>algo</a>
                <a>algo</a>
            </header>

                <Route exact path='/' component={Tablero} />

        </div>

    }

}

export default App;


