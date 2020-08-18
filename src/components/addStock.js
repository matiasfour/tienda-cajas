import React, { Component } from 'react'
import axios from 'axios';
import PopUp from './popUp';
export default class addStock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nombre: '',
            precio: '',
            filename: null,
            descripcion: '',
            disponible: true,
            categoria: '',
            categorias: null,
            disp: 'none',
            color: '',
            mensaje: ''

        }
    }
    
    
    componentDidMount() {
        this.getCat();
    }


    getCat = async () => {
        const categorias = await axios.get('https://tienda-cajas.herokuapp.com/categorias', {
            mode: 'cors'
        })

        this.setState({ categorias: categorias.data });
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



        await axios.post('https://tienda-cajas.herokuapp.com/auth/agregarProducto', formdata)
        


        this.setState({ nombre: '',
        precio: '',
        filename: null,
        descripcion: '',
        categoria: '',
        disp: 'block',
        color: 'green',
        mensaje: 'Producto agregado'
    })

    setTimeout(() => {
        this.setState({disp: 'none'})
    },3000)
    }

    render() {
        return (
            <div>
                <form className="form-add-stock" id="form" onSubmit={this.onSubmit}>
                    <h2>Agregar producto</h2>
                    <input value={this.state.nombre} onChange={this.handleChange} type="text" name="nombre" placeholder="nombre" />

                    <input value={this.state.precio} onChange={this.handleChange} type="text" name="precio" placeholder="precio" />

                    <input value={this.state.descripcion} onChange={this.handleChange} type="text" name="descripcion" placeholder="descripcion" />

                    <label style={{marginTop:'20px'}} htmlFor="">Selecciona una categoria</label>
                   <select style={{marginBottom: '20px'}} onChange={this.handleChange} name="categoria" id="form">
                        <option value="-">-</option>
                    { this.state.categorias ? ( this.state.categorias.map(cat => (
                         <option key={cat._id} value={`${cat.nombre}`}>{cat.nombre}</option>
                    ))):null }

                      
                    </select>  
                    <input className="file" type="file" onChange={(e) => this.handleFile(e)} />

                    <button type="submit">agregar producto</button>

                </form>

                <PopUp color={this.state.color} mensaje={this.state.mensaje} disp={this.state.disp}/>
                   
              
            </div>
        )
    }
}
