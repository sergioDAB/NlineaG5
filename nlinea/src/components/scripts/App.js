import React, { Component } from 'react';
import Tablero from "./Tablero";
import Partidas from "./MenuPartidas";
//import Login from './login';
import Home from './Home';
//import firebase from 'firebase';
import '../css/App.css';
import store from "./store.js";



class App extends Component {

    constructor(props){
        super(props);
        this.state={
            view: "partidas",//'login',//'partidas',
            user:null
        };

        store.subscribe(()=>{
            this.setState({
                view:store.getState().view
            })
        });
    }
/*
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
*/

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

    goInicio(){
        store.dispatch({
            type: "CAMBIAR_VISTA",
            view : 'partidas'
        })
    }

    render() {

        return <div className="App">

            <header className="App-header">
                {/*login*/}
                <button onClick={this.goInicio}> Inicio</button>


            </header>
            {this.renderView()}



        </div>

    }
}

export default App;

/*<Login
                    appName='Bienvenido a N en Linea'
                    user = {this.state.user}
                    onAuth={this.handleAuth.bind(this)}
                    onLogout={this.handleLogout.bind(this)}
                />*/
