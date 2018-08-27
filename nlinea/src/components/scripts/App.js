import React, { Component } from 'react';

import Tablero from "./Tablero";
import Partidas from "./MenuPartidas";

import '../css/App.css';

import store from "./store.js";

class App extends Component {

    constructor(props){
        super(props);
        this.state={
            view:'partidas'
        };

        store.subscribe(()=>{
            this.setState({
                view:store.getState().view
            })
        })
    }


    renderView(){
        console.log("nadie me quiere");
        if(this.state.view==='parametros')
            return   <Tablero/> ;
        else if(this.state.view==='partidas')
            return <Partidas/>


    }

    render() {

        return <div className="App">

            <header className="App-header">
                <h1 className="App-title">Bienvenido a N en linea</h1>

            </header>
            {this.renderView()}

        </div>

    }

}

export default App;


//<Route exact path='/' component={Tablero} />
