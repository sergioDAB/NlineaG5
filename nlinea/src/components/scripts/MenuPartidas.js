import React ,{ Component } from 'react';

import Partida from './Partida';
import '../css/partida.css';
import store from "./store";


class Partidas extends Component {

    constructor(props){
        super(props);

        this.state={
            partidas: [{"size": 5, "nlinea":4, "categoria": "dificil", "creador": "carlos"}]
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
        store.dispatch({
            type: "CAMBIAR_VISTA",
            view: 'parametros'
        })
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
            .then(response => store.dispatch({
                type:"NUEVA_PARTIDA",
                partidas: response.partidas,
                view: 'partidas'
            }));
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
        let n=this.state.partidas.length;
        let p=this.state.partidas;
        console.log("partida"+ this.state.partidas);
        let rows = [];
        for (let i = 0; i < n; i++) {
            rows.push(<Partida creador={p[i].creador} size={p[i].size} nlinea={p[i].nlinea} categoria={p[i].categoria}/>)
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

