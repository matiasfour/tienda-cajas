import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios';
import './styles/mainNav.css'
import { logout, getCartItems, search } from '../redux';
class mainNav extends Component {

    

    state= {
    
     
        direction: '',
        hover: 'green',
        redirect: null,
        displayMenu: '',
        cargando: '',
        busqueda: ''
       
    }

    componentDidMount(){
        if(this.props.login.token){
            this.props.getCartItems(this.props.login.email)
        }
    }

    handleLogout = () => {
        this.props.logout()
        localStorage.clear();
        window.location.href = "https://tienda-cajas.herokuapp.com/"
        this.setState({redirect: '/'})
        }

    showMenu = () => {
        this.setState({displayMenu: 'block'})
    }

    hideMenu = () => {
        this.setState({displayMenu: 'none'})
    }

    handleChangeSearch = (e) => {
        this.setState({busqueda: e.target.value})
      
    }

   search = async  () => {
       
         await  this.props.search(this.state.busqueda);

         setTimeout(() => {
            this.setState({redirect: 'resultados'})    
         },2000)
        
   }

   whatsapp = () => {
       window.location.href= "https://api.whatsapp.com/send?phone=59169064201"
   }







  
    render() {
       if(this.state.redirect === "/"){
           return  <Redirect to={`${this.state.redirect}`}/>
        }

        if(this.state.redirect === "resultados"){
            return <Redirect to={`/${this.state.redirect}`}/>
        }

       
    
       
        return (
            <div className="navContainer">
                
            
                   
                        <div className="top-container">

                    
                            
                                    <p className="username" style={{display: this.props.login.token != null ? 'flex' : 'none'}} > Bienvenido {this.props.login.nombre}  </p>
                                    
                                    
                                    <button className="logout" style={{display: this.props.login.token != null ? 'flex' : 'none'}} onClick= {() => this.handleLogout() }>Cerrar sesion </button>
                                    
                                 
                          
                    
                            
                           
                                

                                <Link className="admin"  style={{display: this.props.login.email === "jenny@gmail.com"   ? 'flex' : 'none'}} to="/administracionJenny"> Administración</Link>

                                <Link className="admin"  style={{display: this.props.login.email === "juanpepe@gmail.com"   ? 'flex' : 'none'}} to="/administracionJenny"> Administración Juancito</Link>

                            
                     
                                <div style={{display: this.props.login.token == null ? 'flex' : 'none'}}  className="login">
                                <p > <Link to="/registro">Registrarse</Link> | <Link to="/login">Iniciar Sesion</Link></p>
                                
                                </div> 

                              

                                <Link onClick={this.whatsapp} style={{fontSize: '18px', marginTop:'10px', textDecoration: 'none', color: 'rgb(0,200,0)'}}>  <i className="fab fa-whatsapp fa-1x" >   </i> <b>Click aqui  +591 69064201  </b>  </Link>
                        </div>


                        {/* top-container for media queries */}

                






              

                <div className="nav-inner-container">
                    
                    <img className="logo" src={require("./imgs/BRENDA CREACIONES.png")} alt="hola"/>
                    <nav  >
                        
                        <ul>
                            <div className="divLi">
                                 <li >
                                <Link to="/"><i class="fas fa-home fa-1x"></i> &nbsp; INICIO</Link>
                            </li>
                            <li>
                                <Link to="/categorias"><i class="fas fa-box fa-1x"></i> &nbsp;   CATEGORIAS</Link>
                            </li>
                            </div>
                           
                        <div className="divLi">
                             <li >
                                <Link to="/pedidosEspeciales"><i class="fas fa-user-tag fa-1x"></i> &nbsp; PEDIDOS ESPECIALES</Link>
                            </li>
                            <li >
                                <Link to="/contacto"> <i class="fas fa-phone-alt fa-1x"> &nbsp; </i> CONTACTO</Link>
                            </li>
                        </div>
                           
                        </ul>
                    </nav>
                   

                </div>
               
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        login: state.login,
        categories: state.categories,
        itemsCart: state.itemsCart
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logout: () => {
            dispatch(logout())
        },
        getCartItems: (email) => {
            dispatch(getCartItems(email));
        },
        search: (busqueda) => {
            dispatch(search(busqueda));
        }

    }
    }
    

export default connect(mapStateToProps,  mapDispatchToProps)(mainNav)
