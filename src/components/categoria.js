import React, { Component } from 'react'
import axios from 'axios';
import './styles/categoria.css'
import {connect} from 'react-redux'
import {getItems, items, getFilterItems,fetchItems} from '../redux/'
import VertNav from './vertNav';
import {Link} from 'react-router-dom'
import { ITEMS } from '../redux/listItems/listItemsTypes';
import Categorias from './categorias'
import NavCategorias from './navCategorias';
import Item from './item'
 class categoria extends Component {


    state = {
        number : 8
    }
  

    componentDidMount() {
        //this.getList();
        //console.log(this.state.list)
        //this.props.getFilterItems();
        this.props.fetchItems();

        

    }

    verMas = () => {
        this.setState({number: this.state.number + 4})
    }

    


 



    
    render() {

        const items = this.props.items.items
        const filterItems = items.filter(item => item.categoria === this.props.categoria)
        const filterNumb = filterItems.filter(item => filterItems.indexOf(item) < this.state.number)
        return (
        <div className="categoriaMainDiv">  
            <NavCategorias/>
            <h2>{this.props.categoria}</h2>

            <div className="listContainer">
                
                
                <div className="title-list">
                  

                    <div className="list">


                        {this.props.items.items ? (filterNumb.map(item => (

                            <Item key={item._id} imagen={item.imagen} 
                                  nombre={item.nombre} 
                                  categoria={item.categoria} 
                                  precio={item.precio}
                                  id = {item._id}
                                                    />

                          
                            
                        ))) : null
                        }

                        
                    </div>
                    <button className="verMas" onClick={this.verMas}>
                            Ver más
                        </button>
                </div>
            </div>
        </div>                   
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        categories: state.categories,
        items: state.items
    }
}

/*const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getFilterItems: () => {
            dispatch(getFilterItems())
        }
    }
    }*/


    const mapDispatchToProps = (dispatch, ownProps) => {
        return {
            fetchItems: () => {
                dispatch(fetchItems())
            }
        }
        }
    

export default connect(mapStateToProps, mapDispatchToProps)(categoria)