import React, { Component } from 'react';

import './css/ficha.css';

class Ficha extends Component {

    constructor(){
        super();
        this.onClick = this.onClick.bind(this);
        this.state={
            img: "ficha"
        }

    }

    onClick(){
        console.log(`${this.props.fila}-${this.props.columna}`);
        console.log(this.state.img);
        if(this.state.img==="ficha"){
            this.state.img="press";


        }else{
            this.state.img="ficha";
        }
    }


    render() {
        return (
            <div className={this.state.img} onClick = {this.onClick} >
            </div>
        );
    }
}

export default Ficha;