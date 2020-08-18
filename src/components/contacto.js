import React, { Component } from 'react';
import './styles/contacto.css'
import axios from 'axios'
class contacto extends Component {

    state= {
        nombre: '',
        asunto: '',
        celular: '',
        mensaje: '',
        email: '',
        disp: 'none'
    }

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    submit = async (e) => {
        e.preventDefault();

         const datosMensaje = {
            nombre: this.state.nombre,
            asunto: this.state.asunto,
            celular: this.state.celular,
            mensaje: this.state.mensaje,
            email: this.state.mensaje
        }

        await axios.post('https://tienda-cajas.herokuapp.com/postMensaje', datosMensaje)
        

        this.setState({
            nombre: '',
            asunto: '',
            celular: '',
            mensaje: '',
            disp: 'block'
        })

        setTimeout(() => {
            this.setState({disp: 'none'})
        },3000)

    }


    render() {
        return (
            <div className="mainContacto">
                <h2 className="services">SERVICIO AL CLIENTE - CONTACTE CON NOSOTROS</h2>

                <form className="form-mensaje" onSubmit={this.submit}>
                            <div className="form-mensaje-container">

                        
                                <div className="infoForm">
                                        <div>
                                                <label htmlFor="">Nombre Completo</label>
                                                <input value={this.state.nombre} onChange={this.handleChange}  type="text" name="nombre"/>
                                        </div>

                                        <div>
                                                <label htmlFor="">Asunto</label>
                                                <input value={this.state.asunto} onChange={this.handleChange}  type="text" name="asunto"/>
                                        </div>

                                        <div>
                                                <label htmlFor="">Celular</label>
                                                <input value={this.state.celular} onChange={this.handleChange}  type="text" name="celular"/>
                                        </div>

                                        <div>
                                        <label htmlFor="">Email</label>
                                                <input value={this.state.email} onChange={this.handleChange}  type="text" name="email"/>
                                        </div>
                                </div>

                            

                                <div className="mensaje">
                                    <label htmlFor="">Mensaje</label>
                                    <textarea value={this.state.mensaje} onChange={this.handleChange}  style={{resize:"none"}} name="mensaje" id="" cols="80" rows="16"></textarea>
                                </div>
                            </div>
                            <button className="enviarInfo"  type="submit">Enviar</button>
                            
                            <p style={{display: this.state.disp, 
                            fontSize:'25px', width: '100%', 
                            backgroundColor: 'blue ', 
                            color: 'white', padding: '10px 15px', marginTop: '10px', borderRadius: '5px'}}>Mensaje enviado</p>
                        <div className="telefono">

                        <p className="telf"> <i style={{color: 'rgb(0,200,0)'}} className="fab fa-whatsapp fa-3x green">  </i>LLÁMANOS AL +591 69064201</p>

                
                    
                    </div>

                </form>

            
            </div>
        );
    }
}

export default contacto;
