import React ,{ Component } from 'react';

import Partida from './Partida';
import '../css/partida.css';
import store from "./store";
import websocket from '../Sockets/webSocket';

let partidas=[{"size": 5, "nlinea":4, "categoria": "dificil", "creador": "carlos"}];

let actualizar;


//funcionamiento de los sockets
websocket.onopen= solicitarPartidas;
if(actualizar!== false){
    websocket.onmessage=solicitarPartidas;
}


function doSend(message) {  // envia un mensaje al servidor de sockets
    console.log("enviado: "+message);
    websocket.send(message);
    //websocket.close();
}

function solicitarPartidas() {
    let url = 'http://localhost:3001/partidas';
    let data = {"data":"get"};

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
        .then(function (response) {
            partidas=response.partidas;
            console.log("actu :"+actualizar);
            store.dispatch({
                type: "NUEVA_PARTIDA",
                partidas: partidas,
                view:'partidas'
            })
        })
}





class Partidas extends Component {

    constructor(props){
        super(props);


        this.state={
            partidas: partidas
        };

        this.linea = React.createRef();
        this.size = React.createRef();
        this.categoria = React.createRef();
        this.agregarPartida=this.agregarPartida.bind(this);

        this.renderPartidas= this.renderPartidas.bind(this);
        this.renderPartida=this.renderPartida.bind(this);

        store.subscribe(()=>{
            this.setState({
                partidas: store.getState().partidas
            });
        });
    }

    goParametros(){
        actualizar=false;
        store.dispatch({
            type: "CAMBIAR_VISTA",
            view: 'parametros'
        });

    }


    agregarPartida(){
        let tam= this.size.current.value;
        let nl = this.linea.current.value;
        let cat= this.categoria.current.value;
        let creador="sergio";


        let url = 'http://localhost:3001/nueva';
        let data = {"size": tam, "nlinea": nl, "categoria": cat, "creador": creador};

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
            .then(function (response) {
                partidas=response.partidas;
                console.log("partidas: ", partidas);
                store.dispatch({
                    type: 'NUEVA_PARTIDA',
                    partidas:partidas,
                    view:'partidas'
                });
                doSend("partida");
            })
    }


    renderPartidas(){
        return(
            <div>
                {this.renderPartida()}
                <button onClick={this.goParametros} className='button_pc'> Jugar contra la PC </button>


                <div className="datos">
                    <br/>
                    <h2> Crear una partida nueva </h2>
                    <br/>
                        <input  id="size" ref={this.size} placeholder="Tamaño"/>
                        <br/>
                        <br/>
                        <input id="linea" ref={this.linea} placeholder=" N en linea "/>
                        <br/>
                        <br/>
                        <input id="categoria"  ref={this.categoria} placeholder="categoria"/>
                        <br/>
                        <br/>
                        <button className='button_crear_partida' onClick={this.agregarPartida}> Agregar a partidas</button>
                    <br/><br/>
                </div>
            </div>
        )
    }



// en esta funcion es donde se le debe dar el valor a cada una de las partidas

    renderPartida() {
        let p=partidas;
        let n=p.length;
        let rows = [];
        for (let i = 0; i < n; i++) {
            rows.push(<Partida creador={p[i].creador}
                               size={p[i].size}
                               nlinea={p[i].nlinea}
                               categoria={p[i].categoria}
            key={p[i].categoria.concat(p[i].creador)}
            />)
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

