import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import logo from './global/images/logo.svg';
import '../App.css';
import Tablero from "./global/Tablero";
import Param from "./global/parametros";



class App extends Component {
    render() {
        this.state={
            hayTablero: false
        };
        return <div className="App">

                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Bienvenido a N en linea</h1>
                </header>

                <Route exact path='/' component={Param} />
                <Route path='/tablero' component={Tablero} />


        </div>

    }

    hayTablero(){
        return this.state.hayTablero;
    }

    changeState(){
        this.state.hayTablero=true;
    }
}

export default App;


