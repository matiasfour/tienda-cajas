import React from 'react';
import './App.css';
import {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCategories, fetchItems, getCartItems} from './redux/'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainList from './components/mainList'
import AddStock from './components/addStock'
import MainNav from './components/mainNav'
import Footer from './components/footer'
import Inicio from './components/inicio';
import axios from 'axios'
import Categoria from './components/categoria'
import addCategoria from './components/addCategoria';
import Registro from './components/registro';
import IniciarSesion from './components/iniciarSesion';
import Pedidos from './components/pedidos';
import addStock from './components/addStock';
import carrito from './components/carrito';
import Categorias from './components/categorias'
import MasInfo from './components/masInfo';
import Admin from './components/admin'
import EditItem from './components/editItem';
import Results from './components/results'
import Contacto from './components/contacto'
import PedidosEspeciales from './components/pedidosEspeciales'
import Mensajes from './components/mensajes';
import userPedidos from './components/userPedidos';

  class App extends Component {

  

    componentDidMount(){
      if(this.props.login.token){
        this.props.getCartItems(this.props.login.email)
    }
      this.props.fetchCategories();
      this.props.fetchItems();

     
    }

  



    render() {
            return (

             

            
                  <div className="App">


                        <div className="mainContainer">


                      
                            <Router>
                                  <MainNav/>
                                  <Route exact path="/" component={Inicio} />
                                  <Route  path="/categorias" component={Categorias} />


                                  {this.props.categories.categories ? (this.props.categories.categories.map(cat => (
                              <Route  path={`/${cat.nombre}`} render={(props) => <Categoria {...props} categoria={`${cat.nombre}`} />} />
                            ))) : null}

                            
                            <Route  path="/login"  component={IniciarSesion} />
                            <Route  path="/registro"  component={Registro} />     
                            <Route path="/misPedidos" component={userPedidos}/>    
                            <Route  path="/pedidosEspeciales"  component={PedidosEspeciales} />
                            <Route  path="/agregarProducto"  component={addStock}/>         
                             <Route  path="/carrito"  component={carrito} />    
                              <Route  path="/masInformacion/:id" component={MasInfo}/>
                              <Route  path="/resultados" component={Results} results={JSON.parse(localStorage.getItem('results'))}/>
                              <Route path="/contacto" component={Contacto} />
                              
                             <Route exact  path="/administracionJenny" component={Admin}/>
                            <Route   path="/editar/:id"   component={EditItem} />
                             <Route path="/administracionJenny/mensajes" component={Mensajes}/>
                              <Route path="/administracionJenny/pedidos" component={Pedidos} />
                             <Footer/>               
                            </Router>
                      </div>
                  </div>              

             
            );
          }

}


const mapStateToProps = (state, ownProps) => {
  return {
      categories: state.categories,
      itemsCart: state.itemsCart,
      login:state.login,
      buscador: state.buscador
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
return {
  fetchCategories: () => {
      dispatch(fetchCategories())
  }
  ,
  fetchItems: () => {
    dispatch(fetchItems())
  },
  getCartItems: (email) => {
    dispatch(getCartItems(email))
}



}
}

  

export default connect(mapStateToProps, mapDispatchToProps)(App)



