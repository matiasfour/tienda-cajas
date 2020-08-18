import React, { Component } from 'react'
import axios from 'axios'
import item from './item'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
class editItem extends Component {

    
    constructor(props) {
        super(props)

        this.state = {
            item: {},
            nombre: '',
            precio: '',
            filename: null,
            descripcion: '',
            disponible: true,
            categoria: '',
            redirect: null
    }

}


    componentDidMount(){
        this.getItem();
    }

    getItem = async () => {
        const {match: {params}} = this.props

        const res =await axios.get(`https://tienda-cajas.herokuapp.com/auth/item/${params.id}`)

        this.setState({nombre: res.data.nombre,
                        precio: res.data.precio,
                        descripcion: res.data.descripcion,
                        categoria: res.data.categoria            
        })
    }

    handleChange = (e) => {
        const { name, value } = e.target;
   
        this.setState({ [name]: value })
    }

    handleFile = (e) => {


        const file = e.target.files[0]
        this.setState({ filename: file });
        
    }


    onSubmit = async (e) => {
        e.preventDefault();
        const nombre = this.state.nombre;
        const precio = this.state.precio;
        const filename = this.state.filename;
        const descripcion = this.state.descripcion;
        const disponible = this.state.disponible;
        const categoria =  this.state.categoria;
        const formdata = new FormData()


        formdata.append('nombre', nombre);
        formdata.append('precio', precio);
        formdata.append('filename', filename);
        formdata.append('descripcion', descripcion);
        formdata.append('disponible', disponible);
        formdata.append('categoria', categoria);


        const {match: {params}} = this.props
        await axios.put(`https://tienda-cajas.herokuapp.com/auth/editarProducto/${params.id}`, formdata)

        this.setState({redirect: "administracionJenny"})
        
    }



    render() {

        if(this.state.redirect == "administracionJenny"){
              return  <Redirect to={`/${this.state.redirect}`}/>
        }

        return (
            <div>
                <h2>Editar </h2>

                <form onSubmit={this.onSubmit} id="edit" action="">
                <input  value={this.state.nombre} onChange={this.handleChange} type="text" name="nombre" placeholder="nombre" />

                <input value={this.state.precio} onChange={this.handleChange} type="text" name="precio" placeholder="precio" />

                <textarea form="edit" value={this.state.descripcion} onChange={this.handleChange}  rows='5' cols='30' name="descripcion" placeholder="descripcion" >
                        {this.state.descripcion}
                </textarea>

                <select onChange={this.handleChange} name="categoria" id="form">

                { this.props.categories.categories ? ( this.props.categories.categories.map(cat => (
                    <option key={cat._id} value={`${cat.nombre}`}>{cat.nombre}</option>
                ))):null }

                
                </select>  
               

                <button type="submit">Modificar producto</button>

                </form>
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

export default connect(mapStateToProps, {})(editItem)
