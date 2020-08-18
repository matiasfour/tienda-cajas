import React, { Component } from 'react';
import {connect} from 'react-redux'
import Item from './item'
class results extends Component {

    state = {
        results: []
    }

    componentDidMount(){
        this.setState({results: JSON.parse(localStorage.getItem('results'))})
    }



    render() {

         
        return (
            <div>

                 <div className="listContainer">
                    <div className="title-list">

                        <div className="list">
                            {
                                this.state.results ? (this.state.results.map(item => (
                                    <Item  imagen={item.imagen} 
                                            nombre={item.nombre} 
                                            categoria={item.categoria} 
                                            precio={item.precio}
                                            id = {item._id}/>
                                ))): <p>No hay resultados</p>
                            }
                        </div>    
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        buscador: state.buscador
    }
}

export default connect(mapStateToProps, {})(results);
