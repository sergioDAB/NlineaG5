import React, { Component } from 'react';
import logo from './global/images/logo.svg';
import '../App.css';
import Tablero from "./global/Tablero";



class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Bienvenido a N en linea</h1>
                </header>
                <p className="App-intro">
                    Datos de la persona
                </p>
                <Tablero/>
            </div>
        );
    }
}

export default App;


