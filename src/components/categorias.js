import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import './styles/categorias.css'
import Item from './item'
import NavCategorias from './navCategorias'
import popUp from './popUp'
 class categorias extends Component {

    state = {
        busqueda: '',
        results: [],
        noResults: '',
        number: 8
    }

    componentDidMount(){
        this.setNumberOnce();
    }

    
    handleChange = (e) => {
        this.setState({busqueda: e.target.value})
        
      
    }


    results = (e) => {

        e.preventDefault();
        const results = this.props.items.items.filter((item) => item.nombre.includes(`${this.state.busqueda}` || item.descripcion.includes(`${this.state.busqueda}`) ))

        if(results.length > 0){
            this.setState({results: results});

            }

        else { this.setState({noResults: 'No hay resultados', results: null})}    

        }

        setNumberOnce = () => {
            this.setState({number: 8})
            const items = this.props.items.items
            const filterNumb = items.filter(item => items.indexOf(item) < this.state.number)
            this.setState({results: filterNumb});
        }

        verMas = () => {
            this.setState({number: this.state.number + 4})
            const items = this.props.items.items
            const filterNumb = items.filter(item => items.indexOf(item) < this.state.number)
            this.setState({results: filterNumb});
        }
        

    render() {
 

        return (
            <div className="categoriasWrapper">   

                    <NavCategorias/>


                 
                <div className="adminInputs">
                    <form className="searchForm" onSubmit={(e) => this.results(e)}>
                        <input onChange={this.handleChange} type="text" placeholder="buscar"/>
                        <button type="submit">Buscar</button>

                    </form>

                    <button style={{fontSize: '25px', marginBottom: '20px'}} onClick={() => this.setState({results: this.props.items.items})} >Ver todo</button>
                    
                </div>
                
                <div className="listContainer">
                

                
                        <div className="title-list">
                        

                            <div className="list">


                                {this.state.results ? (this.state.results.map(item => (

                                    <Item key={item._id} imagen={item.imagen} 
                                        nombre={item.nombre} 
                                        categoria={item.categoria} 
                                        precio={item.precio}
                                        id = {item._id}
                                                            />

                                
                                    
                                ))) : 'no hay resultados'
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

export default connect(mapStateToProps, {})(categorias)
