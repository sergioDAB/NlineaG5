import React, { Component } from 'react';
import Tablero from "./Tablero";
import Partidas from "./MenuPartidas";
import Login from './login';
import Home from './Home';
import firebase from 'firebase';
import '../css/App.css';
import store from "./store.js";

//import io from 'socket.io';

//var socket= io.conn('http://localhost:3001',{'forceNew':true});

const wsUri= "ws://localhost:3002";
let websocket= new WebSocket(wsUri);
init();

function init(){
    testWebSocket();
}


function testWebSocket() {
    websocket.onopen= onOpen;
    websocket.onclose=onClose;
    websocket.onmessage=onMessage;

    websocket.onerror=onError;
}

function onOpen(evt) {
    console.log("CONECTADO");
    doSend("web socket funciona");
}

function onClose(evt) {
    console.log("desconectado");
    websocket.close();
}

function onMessage(evt) {
    console.log("mensaje: "+evt.data);
    //websocket.close();
}

function onError(evt) {
    console.log("error: "+evt.data);
}

function doSend(message) {
    console.log("enviado: "+message);
    websocket.send(message);
}



class App extends Component {

    constructor(props){
        super(props);
        this.state={
            view: 'login',//'partidas',
            user:null
        };

        store.subscribe(()=>{
            this.setState({
                view:store.getState().view
            })
        });

        this.obtenerVistaActual= this.obtenerVistaActual.bind(this);
    }


    obtenerVistaActual(){
        let url = 'http://localhost:3001/view';
        let data = {"usuario":'sergio'};

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            cors: 'disabled',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => store.dispatch({
                type:"CAMBIAR_VISTA",
                view: response.view
            }));
    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.setState({
                    user:user,
                    view : 'partidas'
                })
            }else{
                this.setState({
                    user:null,
                    view:'login'
                })
            }
        })
    }

    handleAuth(){
        const provider= new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => console.log("ha iniciado sesion"+ result))
            .catch(error => console.error(error));


    }

    handleLogout(){
        firebase.auth().signOut()
            .then(() => console.log("ha salido con exito"))
            .catch(err  => console.error(err))
    }


    renderView() {
        if (this.state.view === 'parametros') {
            return <Tablero/>;
        }
        else if (this.state.view === 'tablero') {
            return <Tablero/>;
        }

        else if (this.state.view === 'partidas') {
            return <Partidas/>
        }
        else if (this.state.view === 'login') {
            return <Home/>
        }

    }

    render() {

        return <div className="App">

            <header className="App-header">
                <Login
                    appName='Bienvenido a N en Linea'
                    user = {this.state.user}
                    onAuth={this.handleAuth.bind(this)}
                    onLogout={this.handleLogout.bind(this)}
                />


            </header>
            {this.renderView()}

            <button onClick={onOpen}>Enviar mensaje</button> // manda un mensaje

        </div>

    }

}

export default App;


