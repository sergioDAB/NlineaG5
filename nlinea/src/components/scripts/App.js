import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Tablero from "./Tablero";

import '../css/App.css';



class App extends Component {


    render() {
        /*let url = 'http://localhost:3001/config';
        let data = {"size": 3, "nlinea": 3};

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            cors: 'disabled',
            credentials: 'same-origin',
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));*/

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


