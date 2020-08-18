import React, { Component } from 'react'
import axios from 'axios'
import { ITEMS } from '../redux/listItems/listItemsTypes';
import './styles/pedidos.css'
export default class pedidos extends Component {

    state = {
        pedidos: []
    }

    componentDidMount(){
        this.getOrders();
      
    }


    getOrders = async () => {
        const pedidos = await axios.get('https://tienda-cajas.herokuapp.com/auth/pedidos')

        this.setState({pedidos: pedidos.data})
       

    }

    render() {
        return (
            <div className="mainPedidos">
                
                        <h2>Lista de pedidos</h2>

                      
                               
                            {   
                                this.state.pedidos ? (this.state.pedidos.map(pedido => (
                                    
                                        <div key={pedido._id} className="listPedido">

                                            <div className="pedido">
                                                    <p><b>Nombre : </b> {pedido.usuario}</p>
                                                <p><b>Email : </b>{pedido.email}</p>
                                                <p><b>Modalidad : </b>{pedido.modalidad}</p>
                                                <p><b>Direccion : </b>{pedido.direccion}</p>
                                                <p><b>Celular : </b>{pedido.celular}</p>
                                                <p><b>Valor : </b>{pedido.valor}</p>
                                            </div>
                                        


                                            <div className="mainDetalle">
                                                   <p>
                                                        <b>Detalle de pedido : </b>
                                                        {pedido.compra.map(item => (
                                                            <div className="detalle">
                                                                <p><b>Producto : </b>{item.producto}</p>
                                                                <p><b>Cantidad : </b>{item.cantidad}</p>   
                                                            </div>
                                                        ))}
                                                  </p>
                                            
                                            </div>
                                         
                                        
                                        </div>
                                
                                        
                                    
                                        
                            
                            ))): null}
                     
                        
                    

               
                
            </div>
        )
    }
}
