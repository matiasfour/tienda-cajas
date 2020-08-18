import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
class userPedidos extends Component {

    state = {
        pedidos: []
    }

    componentDidMount(){
        this.getOrders();
        
    }


    getOrders = async () => {
        const pedidos = await axios.get('https://tienda-cajas.herokuapp.com/pedidos')

        const filterPedidos = pedidos.data.filter(pedido => pedido.email == this.props.login.email )

        this.setState({pedidos: filterPedidos})
       

    }





    render() {
        return (
            <div className="mainPedidos">
                
                <h2>Lista de pedidos</h2>

            
                    
                    {   
                        this.state.pedidos ? (this.state.pedidos.map(pedido => (
                            
                                <div key={pedido._id} className="listPedido">

                                    <div className="pedido">
                                            
                                        
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


const mapStateToProps = (state, ownProps) => {
    return {
        login: state.login
    }
}


export default connect(mapStateToProps, {})(userPedidos)