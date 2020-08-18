import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './styles/adminItemsContainer.css'
class adminItems extends Component {

    state = {
        busqueda: '',
        items: [],
        cargando: ''
    }

    componentDidMount() {
        this.getItems();
    }

    getItems = async () => {
         const res = await axios.get('https://tienda-cajas.herokuapp.com/')
         this.setState({items: res.data});


    }
 

    handleChange = (e) => {
        this.setState({busqueda: e.target.value})
      
    }

    submit = () => {
        const results = this.props.items.items.filter(item => item.nombre == `${this.state.busqueda}`)
        this.setState({items: results});
    }


    deleteItem = async (id) => {
        await axios.delete(`https://tienda-cajas.herokuapp.com/auth/eliminarProducto/${id}`)

        const res = await axios.get('https://tienda-cajas.herokuapp.com/')
        this.setState({items: res.data});
    }

  

    handleSearch = async (e) => {
        e.preventDefault();

        this.setState({cargando: 'BUSCANDO...'})
        const res = await axios.get('https://tienda-cajas.herokuapp.com/auth/busqueda/'+this.state.busqueda);

        this.setState({items: res.data, cargando: ''})
    }

    render() {


        return (
            <div className="adminItemsContainer">


                <div className="adminInputs">
                    <form className="searchForm" onSubmit={this.handleSearch}>
                        <input onChange={this.handleChange} type="text" placeholder="buscar"/>
                        <button type="submit">Buscar</button>

                    </form>

                    <button onClick={this.getItems} >Ver todo</button>
                    
                </div>

                <div className="items-list">
                <h1>{this.state.cargando}</h1>
                      {
                    this.state.items ? (this.state.items.map(item => (
                            <div key={item._id} className="adminItem">
                                <img src={`https://tienda-cajas.herokuapp.com/public/${item.imagen}`} alt=""/>
                                <h3>{item.nombre}</h3>
                                <p>{item.categoria}</p>
                                <p>{item.precio}</p>
                                <p>{item.descripcion}</p>
                                <button onClick={() => this.deleteItem(item._id)} >Eliminar </button>
                                <Link to={`/editar/${item._id}`}>Editar</Link>
                            </div>
                    ))): null
                }
                </div>
              
                
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        categories: state.categories,
        itemsCart: state.itemsCart,
        login:state.login,
        items: state.items
    }
  }


    
      
    
    export default connect(mapStateToProps, () => {})(adminItems)
