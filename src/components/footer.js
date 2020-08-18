import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import './styles/footer.css'
class footer extends Component {
    render() {
        return (
            <div className="footerWrapper">
                <footer>
                    <div className="footContainer">

                            <div className="cols">
                                <div className="footCol">
                                    <h3>INFORMACIÓN</h3>

                                    <ul>
                                        <li>
                                            <Link to="/contacto">Solicitar Cotización</Link>
                                        </li>
                                        <li>
                                            <Link to="/contacto">Términos y condiciones</Link>
                                        </li>
                                      
                                    
                                    </ul>
                                </div>

                                <div className="footCol">
                                    <h3>PRODUCTOS</h3>

                                    <ul>
                                        <li>
                                            <Link>Muebles</Link>
                                        </li>
                                        <li>
                                            <Link>Cajas</Link>
                                        </li>
                                        <li>
                                            <Link>Canastas</Link>
                                        </li>
                                        <li>
                                            <Link>Bandejas</Link>
                                        </li>
                                    </ul>
                                </div>

                                <div className="footCol">
                                    <h3>CONTACTO</h3>
                                        
                                    <ul>
                                        <li>
                                        Isabel La Catolica 474, Ramada, Santa Cruz de La Sierra
                                        </li>
                                        <li>
                                            <Link>Whatsapp +591 69064201</Link>
                                        </li>
                                        <li>
                                            <Link>Email  brendacreaciones20@gmail.com</Link>
                                        </li>
                                        <li>
                                            <Link>Horario de Atención L-V 7AM - 4PM</Link>
                                        </li>
                                    </ul>
                                </div>   
                            </div>
                                

                                
                            
                            

                    </div>
                    <p>COPYRIGHT 2020 - BRENDA CREACIONES</p>
                </footer>
                <b>obten tu sitio web contacta al email matiasfour@gmail.com </b> 
            </div>
        );
    }
}

export default footer;
