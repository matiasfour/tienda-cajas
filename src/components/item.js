import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { addToCart, getCartItems } from "../redux/";
import PopUp from './popUp'
import './styles/categoria.css'



 class item extends Component {

    
    state = {
        color: "",
        disp: "none",
        mensaje: "",
        disable: localStorage.getItem('disable'),
        bgDisable: localStorage.getItem('disable') == 'true' ? 'blue' : 'black',
        outline: 'black',
        text: 'Agregar al carrito',
        dispIcon: 'none' 
    }

    componentDidMount() {
      this.setState({disable: localStorage.getItem('disable') })
  
    }

    addCart = (e) => {
      
        const idItem = e.target.className;

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
          idList: idItem
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

        


        return (
            <div>
               
                            <div className="producto">
                                <img src={`https://tienda-cajas.herokuapp.com/public/${this.props.imagen}`} alt="" />
                                
                                <p className="nombre">{this.props.nombre}</p>
                                <p>{this.props.categoria}</p>
                                <p className="precio" ><b>{this.props.precio} Bs </b></p>
                           
                                <div className="opciones">  
                                                                                                                      
                                
                                <Link to={`/masInformacion/${this.props.id}`} >Más información</Link>
                               
                                </div>

                                <PopUp
                               
                                mensaje={this.state.mensaje}
                                color={this.state.color}
                                disp={this.state.disp}
                            />

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

export default connect(mapStateToProps, mapDispatchToProps)(item)
