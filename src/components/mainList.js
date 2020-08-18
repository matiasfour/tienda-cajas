import React, { Component } from "react";
import { getItems, fetchItems, addToCart, getCartItems } from "../redux/";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles/mainList.css";
import PopUp from "./popUp";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import Item from './item'
import {
  Carousel,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

class mainList extends Component {
  state = {
    color: "",
    disp: "none",
    mensaje: "",
    number: 0,
    random: 4,
    marginLeft: 0,
    marginRight: 0,
  };

  componentDidMount() {
    this.props.getCartItems(this.props.login.email);
    this.props.fetchItems();
    
  }

  getRandomInt(min, max) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    this.setState({ random: r });
  }

  addCart = (e) => {
  
    const idItem = e.target.className;

    const num = this.state.number;

    const item = {
      nombre: this.props.items.items.filter((item) => item._id === idItem)[0]
        .nombre,
      imagen: this.props.items.items.filter((item) => item._id === idItem)[0]
        .imagen,
      precio: this.props.items.items.filter((item) => item._id === idItem)[0]
        .precio,
      descripcion: this.props.items.items.filter(
        (item) => item._id === idItem
      )[0].descripcion,
      categoria: this.props.items.items.filter((item) => item._id === idItem)[0]
        .categoria,
      userEmail: this.props.login.email,
    };

    if (this.props.login.token == null) {
      this.setState({
        color: "red",
        mensaje: "Debes registrarte o iniciar sesión",
        disp: "block",
      });

      setTimeout(() => {
        this.setState({ disp: "none" });
      }, 3000);
    }

    if (this.props.login.token) {
      this.props.addToCart(item);
      this.props.getCartItems(this.props.login.email);
      this.setState({ number: this.state.number++ });
      console.log(this.state.number);
      this.setState({
        color: "green",
        mensaje: "agregado al carrito",
        disp: "block",
      });
      setTimeout(() => {
        this.setState({ disp: "none", number: 0 });
      }, 3000);
    }
  };

  render() {
    const items = this.props.items.items;
    const filterBest1 = items.filter(
      (item) =>
        item.nombre === "caja feliz dia" ||
        item.nombre === "caja de mimbre pequeña" ||
        item.nombre == "Caja de corazon" ||
        item.nombre == "cajita de madera"
    );
    const filterBest2 = items.filter(
      (item) => item.categoria === "caja natural"
    );
    

    return (
      <div className="main-listContainer">
        
          <div className="quienesSomos">
                <h2>FABRICAMOS TODO TIPO DE ARTÍCULOS DE MADERA</h2>
               

                <div className="quienesSomosInfo">
                    <img
                        src={require("./imgs/foto-banner-1.png")}
                        alt=""
                    />
                    <p>
                        En nuestro catalogo
                        encontraras Cajas, Bandejas para regalos sorpresa
                        desayunos sorpresa, fabricamos cajas de cualquier medida.
                        Tambíen encontrarás canastas para regalos, botellas y fotos.
                        Realizamos muebles pequeños como toquitos, mesitas y fruteros.
                    </p>
                </div>
          </div>

          <PopUp
            number={this.state.number}
            mensaje={this.state.mensaje}
            color={this.state.color}
            disp={this.state.disp}
          />

          <div className="bestSellers">
            <h2>Productos destacados</h2>
            <div className="main-list">
              {this.props.items.items
                ? filterBest1.map((item) => (
                    <div key={item._id}>
                      <Item imagen={item.imagen} 
                                  nombre={item.nombre} 
                                  categoria={item.categoria} 
                                  precio={item.precio}
                                  id = {item._id} />
                    </div>
                  ))
                : null}
            </div>
          </div>

          <div className="main-asideInfo">

                   

                        <div className="customBoxesInfo">
                              <h2>¿Quieres articulos personalizados?</h2>
                            <p>
                            ¿Necesitas un producto personalizado en madera?
                            <br />
                            Estás en el sitio indicado. Contactá con nosotros <br />y te
                            hacemos presupuesto
                            </p>
                            <Link className="btn-aside" to="/contacto">
                            CONTACTAR
                            </Link>
                        </div>
                   
                      <div className="combinada">
                          <div className="comb2">
                            <img src={require("./imgs/imagenes cajas/foto1comb.png")} alt=""/>
                            <img src={require("./imgs/imagenes cajas/foto3comb.png")} alt=""/>
                          </div>
                        
                          <img class="foto2comb" src={require("./imgs/imagenes cajas/foto2combok.png")} alt=""/>

                      </div>

           </div>

          

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.items,
    login: state.login,
    itemsCart: state.itemsCart,
    categories: state.categories,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchItems: () => {
      dispatch(fetchItems());
    },
    addToCart: (item) => {
      dispatch(addToCart(item));
    },

    getCartItems: (email) => {
      dispatch(getCartItems(email));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(mainList);
