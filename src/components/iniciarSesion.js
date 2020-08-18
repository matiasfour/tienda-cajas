import React, { Component } from 'react';
import  {Link,Redirect} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux'
import {login} from '../redux'
import './styles/registro.css'
class iniciarSesion extends Component {


    state = {
      
        email:'',
        contraseña:'',
        disp1: 'none',
        error: null,
        redirect: null,
        success: null

    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }


   loginUser = async (e) => {

        e.preventDefault();
    
    
        const usuario = {
            
            email : this.state.email,
            password: this.state.contraseña,
        
        }   

            
    
            await this.props.login(usuario)
            this.setState({success: "Cargando.."})

               if(this.state.success == "Cargando.."){ 
                   setTimeout(() => {
                    window.location.href ="https://tienda-cajas.herokuapp.com/";
                   },1000)
                   
                }

               /* this.setState({redirect: "/"})*/
        
             }

    




    render() {
        
      if(this.state.redirect === "/") {

       return  <Redirect to={`${this.state.redirect}`} />

      }
        
    
      

        return (


            <div className="iniciarSesionContainer"  >
                <h2 >Iniciar sesion</h2>
                <form onSubmit={this.loginUser}>
         

                    <input value={this.state.email} onChange={this.handleChange} type="email" name="email" placeholder="Email"/>

                

                    <input value={this.state.contraseña} onChange={this.handleChange} type="password" name="contraseña" placeholder="Contraseña"/>

                    
                    <button type="submit" > Iniciar sesion</button>

                   


                </form>

                <p style={{fontSize: '25px'}}>{this.state.success}</p>
               
            </div>
        );

      
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        login: state.login
    }
  }
  
  const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (usuario) => {
        dispatch(login(usuario))
    }
  }
  }

 export default connect(mapStateToProps, mapDispatchToProps)(iniciarSesion)


