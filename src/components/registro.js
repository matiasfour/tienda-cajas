import React, { Component } from 'react';
import axios from 'axios';
import './styles/registro.css'
import {Redirect} from 'react-router-dom'
import {register} from '../redux'
import {connect} from 'react-redux'
class registro extends Component {


    state = {
        nombre : '',
        apellido :'',
        email:'',
        ciudad:'',
        celular:'',
        contraseña:'',
        disp1: 'none',
        redirect: null,
        success: null

    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }


    registerUser = (e) => {
        e.preventDefault();

        const usuario = {
            nombre : this.state.nombre,
            apellido : this.state.apellido,
            email : this.state.email,
            ciudad : this.state.ciudad,
            celular : this.state.celular,
            password : this.state.contraseña
        }
        
      this.props.register(usuario);
        this.setState({success: 'Usuario creado con exito, redireccionando a iniciar sesion'})

        setTimeout(() => {
            this.setState({redirect:'login'})
        }, 2000)
      
    }

    render() {
        
        if(this.state.redirect === "login") {
            return <Redirect to={`/${this.state.redirect}`}/>
        }


      

        return (
            
            <div>


                <form onSubmit={this.registerUser}>
                    <input value={this.state.nombre} onChange={this.handleChange} type="text" name="nombre" placeholder="Nombre"/>

                    <input value={this.state.apellido} onChange={this.handleChange} type="text" name="apellido" placeholder="Apellido"/>

                    <input value={this.state.email} onChange={this.handleChange} type="email" name="email" placeholder="Email"/>

                    <input value={this.state.ciudad} onChange={this.handleChange} type="text" name="ciudad" placeholder="Ciudad"/>

                    <input value={this.state.celular} onChange={this.handleChange} type="text" name="celular" placeholder="Celular"/>

                    <input value={this.state.contraseña} onChange={this.handleChange} type="password" name="contraseña" placeholder="Contraseña"/>

                    
                    <button type="Submit">Registrarse</button>




                </form>

                <p style={{fontSize: '20px'}}>
                    {this.state.success}
                </p>
                
             
                
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        register: state.register
    }
  }
  
  const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    register: (usuario) => {
        dispatch(register(usuario))
    }
  }
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(registro);
