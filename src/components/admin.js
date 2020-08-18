import React, { Component } from 'react'
import AddCategoria from './addCategoria'
import AddStock from './addStock'
import {Link} from 'react-router-dom'
import './styles/admin.css'
import {connect} from 'react-redux'
import { items } from '../redux'
import AdminItems from './adminItems'


class admin extends Component {


   
    render() {
        return (
            <div className="container-admin">

                <div className="agregar">
                    <AddStock/>
                    <AddCategoria/>
                    <div className="containerVerMensajes">
                           <Link className="verMensajes" to="/administracionJenny/mensajes">VER MENSAJES</Link> 
                           
                    </div>

                    
                
                </div>


                <div style={{width: '100%', marginTop: '30px'}}>
                    <h2>Todos los productos</h2>

                    <AdminItems/>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        categories: state.categories,
        itemsCart: state.itemsCart,
        login:state.login,
        items: state.items
    }
  }



    
      
    
    export default connect(mapStateToProps, () => {})(admin)
