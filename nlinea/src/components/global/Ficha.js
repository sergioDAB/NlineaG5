import React, { Component } from 'react';

import './css/ficha.css';


class Ficha extends Component {

    constructor(){
        super();
        this.button = React.createRef();
        this.changeColor = this.changeColor.bind( this );
        this.onClick = this.onClick.bind(this);
        this.state={
            img: "ficha"
        }

    }

    changeColor() {
        this.button.current.style.backgroundColor = 'red'
    }

    onClick(){
        console.log(`${this.props.fila}-${this.props.columna}`);
        this.changeColor();
        if(this.state.img==="ficha"){
            this.state.img="press";


        }else{
            this.state.img="ficha";
        }
    }


    render() {
        return (
            <div ref= {this.button } className={this.state.img} onClick = {this.onClick}>
            </div>
        );
    }
}

export default Ficha;