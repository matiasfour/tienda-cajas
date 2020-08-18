import React, { Component } from 'react'
import './styles/itemInfo.css'
import {connect} from 'react-redux'
import { addToCart, getCartItems } from "../redux/";
import PopUp from './popUp'
import Item from './item'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
   

class itemInfo extends Component {

    state = {
        color: "",
        disp: "none",
        mensaje: "",
        disable: localStorage.getItem('disable'),
        bgDisable: localStorage.getItem('disable') == 'true' ? 'white' : 'black',
        outline: 'black',
        text: 'Agregar al carrito',
        dispIcon: 'none' 
    }
    componentDidMount() {
      this.setState({disable: localStorage.getItem('disable') })
  
    }


    addCart = (e) => {
        console.log(e.target.className);
        const idItem = e.target.className;
    

    
        const item = {
          nombre: this.props.items.items.filter((item) => item._id === idItem)[0].nombre,
          imagen: this.props.items.items.filter((item) => item._id === idItem)[0].imagen,
          precio: this.props.items.items.filter((item) => item._id === idItem)[0].precio,
          descripcion: this.props.items.items.filter((item) => item._id === idItem)[0].descripcion,
          categoria: this.props.items.items.filter((item) => item._id === idItem)[0].categoria,
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

          localStorage.setItem(`${idItem}`, true)
          
          this.setState({
            color: "green",
            mensaje: "agregado al carrito",
            disp: "block",
            disable: true,
            bgDisable: localStorage.getItem('disable') == 'true' ? 'blue' : 'black',
            text: "Ya lo tienes",
            dispIcon: 'inline'
          });
          setTimeout(() => {
            this.setState({ disp: "none"});
          }, 3000);
        }
      };

    render() {
            const items = this.props.items.items
            const filterItems = items.filter(item => item.categoria === this.props.categoria)



        return (
          <div >

        
                      <div className="containerItemInfo">
                              <div className="itemInfo">
                                          <img src={`https://tienda-cajas.herokuapp.com/public/${this.props.imagen}`}  alt="imagen"/>
                                          <div className="textInfo">
                                              <h3>Artículo : {this.props.nombre}</h3>
                                              <p>Descripcion: {this.props.descripcion}</p>
                                              <p>Precio : {this.props.precio} Bs</p>

                                          
                                          
                                          
                                          </div>
                                                
                              </div>

                        
                        

                      </div>

                   
                        
                
          </div>
      
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        categories: state.categories,
        items: state.items,
        itemsCart: state.itemsCart,
        login: state.login
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
   
      addToCart: (item) => {
        dispatch(addToCart(item));
      },
  
      getCartItems: (email) => {
        dispatch(getCartItems(email));
      },
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(itemInfo)
