import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import MainList from './mainList'
import './styles/inicio.css'
import VertNav from './vertNav'
import {Carousel} from 'react-bootstrap'
import {connect} from 'react-redux'
import {getCartItems} from '../redux'
class inicio extends Component {

    componentDidMount(){
        if(this.props.login.token){
            this.props.getCartItems(this.props.login.email)
        }

       
    }




    render() {
        return (
            <div className="inicioContainer">

                    <Carousel >
                    <Carousel.Item >
                        <img
                        className="d-block w-100 imgCarousel"
                        src={require("./imgs/portada1.png")}
                        alt="First slide"
                        />
                       
                    </Carousel.Item>
                    
                    <Carousel.Item>
                        <img
                        className="d-block w-100 imgCarousel"
                        src={require("./imgs/Portada4.png")}
                        alt="Third slide"
                        />

                        
                    </Carousel.Item>
                    </Carousel>

                <MainList/>
            </div>
        );
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
   
    
  
      getCartItems: (email) => {
        dispatch(getCartItems(email));
      }
    };
  };



export default connect(mapStateToProps, mapDispatchToProps)(inicio);
