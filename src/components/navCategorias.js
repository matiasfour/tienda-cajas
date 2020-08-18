import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import './styles/categorias.css'
import { cart } from '../redux'
 class navCategorias extends Component {
    render() {
        return (
            <div className="categorias">
                {
                    this.props.categories.categories ? (this.props.categories.categories.map(cat => (
                        <div key={cat._id} className="categoria">
                                <Link to={`${cat.nombre}`}>
                                
                                {cat.nombre}

                                </Link>
                    
                            </div>
                      
                    ))): null
                }

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


export default connect(mapStateToProps, {})(navCategorias)
