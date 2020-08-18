import React, { Component } from 'react'
import axios from 'axios';
import PopUp from './popUp'
export default class addCategoria extends Component {
    constructor(props) {
        super(props);

        this.state = {
             nombre:'',
             color: '',
             mensaje: '',
             disp: 'none'
        
        }
    }
  

 


    handleChange = (e) => {
        const {name, value} = e.target;
       
        this.setState({[name]: value})
    }




    onSubmit = async (e) => {
        e.preventDefault();
        const categoria =  {nombre:this.state.nombre};
    
await axios.post('https://tienda-cajas.herokuapp.com/categorias', categoria)
    
        

    this.setState({color: 'green', mensaje: 'Categoria agregada', disp:'block'})


    setTimeout(() => {
        this.setState({disp: 'none'})
    },3000)

    }

    render() {
        return (
            <div>
                <form className="form-add-stock" onSubmit={this.onSubmit}>
                    <h2>Añadir categoria nueva</h2>
                    <input value={this.state.nombre} onChange={this.handleChange} type="text" name="nombre" placeholder="nombre"/>

        
         


                    <button type="submit">agregar categoria</button>

                </form>

                <PopUp color={this.state.color} mensaje={this.state.mensaje} disp={this.state.disp}/>
            </div>
        )
    }
}
