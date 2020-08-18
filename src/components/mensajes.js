import React, { Component } from 'react';
import axios from 'axios'
import './styles/mensaje.css'
class mensajes extends Component {

    state = {
        mensajes: null
    }

    componentDidMount(){
        this.getMensajes();
    }

    getMensajes = async () => {
        const mensajes = await axios.get('https://tienda-cajas.herokuapp.com/mensajes');

        this.setState({mensajes: mensajes.data});
        
    }

    deleteMensaje = async (id) => {
        await axios.delete('https://tienda-cajas.herokuapp.com/mensaje/delete/'+id)
        this.getMensajes();
    }


    render() {
        return (
            <div className="MainContainerMensajes">
                {
                    this.state.mensajes ? ( this.state.mensajes.map((mensaje) => (
                        
                            <div key={mensaje._id} className="containerMensaje">
                                <div className="userMensaje">
                                   
                                    <p> <b>Nombre : </b>{mensaje.nombre}</p>

                                    <p>  <b>Asunto : </b> {mensaje.asunto}</p>

                                    <p>  <b>Celular : </b>{mensaje.celular}</p>

                                    <p>  <b>Email : </b>{mensaje.email}</p>
                                </div>

                                <div className="bodyMensaje">
                                    <p> <b>Mensaje : </b>{mensaje.mensaje}</p>

                                    <button onClick={() => this.deleteMensaje(mensaje._id)}>ELIMINAR MENSAJE</button>
                                </div>


                            </div>
                    ))): null
                }
            </div>
        );
    }
}

export default mensajes;
