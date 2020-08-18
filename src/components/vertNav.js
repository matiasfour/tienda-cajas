import React, { Component } from 'react';
import './styles/vertNav.css'
import {connect} from 'react-redux'
import {fetchCategories} from '../redux/'
import axios from 'axios'
import {Link} from 'react-router-dom'
class vertNav extends Component {



    componentDidMount(){
        this.props.fetchCategories()
    }

    getCats = async () => {
        const cats = await axios.get('http://localhost:4000/categorias', {
            mode: 'cors'
        })

        this.setState({categorias: cats.data})
    }

    render() {
        return (
            <div>
                    <nav className="verticalNav">
                    <ul className="mainUL">

                    {this.props.categories.categories? (this.props.categories.categories.map(cat => (
                         <li key={cat._id} >
                            <Link to={`/${cat.nombre}`} > {cat.nombre} </Link>
                            
                        </li>
                    ))):null}
                       
                    </ul>
                    
                </nav>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        categories: state.categories
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
return {
    fetchCategories: () => {
        dispatch(fetchCategories())
    }
}
}



export default connect(mapStateToProps, mapDispatchToProps)(vertNav)
