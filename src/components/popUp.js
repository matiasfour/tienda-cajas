import React, { Component } from 'react'
import './styles/popUp.css'
export default class popUp extends Component {
    render() {
        return (
            <div className="popUpContainer" style={{display: this.props.disp}}>
                <p style={{backgroundColor: this.props.color}} >{this.props.mensaje} {this.props.number == 0 ? '' : this.props.number}</p>
            </div>
        )
    }
}
