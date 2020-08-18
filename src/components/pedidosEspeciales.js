import React, { Component } from 'react';
import './styles/categorias.css'
class pedidosEspeciales extends Component {
    render() {
        return (
            <div className="main-especial">
                        <div className="categoriasInfo">
                            <h1 style={{margin: "30px 0px"}}>Consulta por artículos personalizados</h1>

                            <div className="categoriasInfoImg">
                                <div className="text">
                                    <h3 >Tu estilo de vida con madera</h3>
                                </div>
                                <img src={require('./imgs/imagenes cajas/caja-de-plantas.png')} alt=""/>
                            </div>

                            <div className="galeria">
                                
                                <div className="bloque1">
                                    <img src={require("./imgs/imagenes cajas/canastero.jpg")} alt=""/>
                                    <div className="side1">
                                        <img  src={require('./imgs/imagenes cajas/bandeja-barniz.jpg')} alt=""/>
                                        <img  src={require('./imgs/imagenes cajas/cajita-peque.jpg')} alt=""/>

                                    </div>
                                    <img src={require("./imgs/imagenes cajas/cajagracias.jpg")} alt=""/>
                                </div>

                                <div className="bloque2">
                                <img className="bl1"  src={require("./imgs/imagenes cajas/bar.jpg")} alt=""/>
                                <img className="bl2"   src={require("./imgs/imagenes cajas/cajas-plantas.jpg")} alt=""/>
                                </div>

                                 
                            </div>

                            <div className="galeria-media">

                                
                                <img src={require("./imgs/foto-banner-1.png")} alt=""/>

                                <img src={require("./imgs/foto-banner-2.png")} alt=""/>

                                <img src={require("./imgs/cajas-size.jpg")} alt=""/>
                               
                           
                            </div>


                         
                    </div>
            </div>
        );
    }
}

export default pedidosEspeciales;
