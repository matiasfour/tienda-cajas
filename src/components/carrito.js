import React, { Component } from 'react'
import {getItems, fetchItems, addToCart, getCartItems, removeCartItem} from '../redux/'
import {connect} from 'react-redux'
import axios from 'axios';
import {Link} from 'react-router-dom'
import './styles/carrito.css'
import StripeCheckout from 'react-stripe-checkout'
import PopUp from './popUp'
 class carrito extends Component {

    state = {
      

       productos: [],
       sumatoria: 0 ,
       mensaje: '',
       color: '',
       disp: 'none',
       proceso: '',
       value: '',
       modalidad: 'A domicilio',
       direccion: ''
       
      
    }

    componentDidMount() {
        this.props.getCartItems(this.props.login.email)
        this.props.itemsCart.itemsCart.map(item => {
           
            localStorage.setItem(`${item.nombre}`, '0')
            
            
        })

      
     
        
       
    }

    componentWillUnmount() {
        this.props.itemsCart.itemsCart.map(item => (
            localStorage.removeItem(`${item.nombre}`)
        ))
    }

    deleteItem = async (e) => {
       
        const nombre = e.target.name
        //this.setState({ [nombre]: 0})
        const eliminado = Object.keys(this.state).find(item => item == nombre)
        const index = Object.keys(this.state).indexOf(eliminado);
        const valorKey = Object.values(this.state).indexOf(index)
          
        
        const valor = parseInt(localStorage.getItem(`${eliminado}`))
        this.getTotal(valorKey);
        const item = e.target.id;
          const idList = e.target.className;
        



        await this.props.removeCartItem(item) 
         localStorage.removeItem(`${idList}`);
        await this.props.getCartItems(this.props.login.email)

        window.location.href= "https://tienda-cajas.herokuapp.com/carrito"

       

        }

    handleChange = (e) => {
        const precio = parseInt(e.target.id)
        const nombre = e.target.name;

        const item = {nombre: `${e.target.name}`, valor: e.target.value*precio , precio: precio}
      
         this.setState({[e.target.name]: e.target.value*precio})
        localStorage.setItem(`${e.target.name}`, e.target.value*precio)
        //localStorage.setItem(`${e.target.name}`, JSON.stringify(item))


        this.setState({productos: [...this.state.productos, nombre ]})


        this.getTotal();



    }
        pagar = async (token) => {
          
            this.setState({proceso: 'Procesando compra....'})

            this.verState();
            
            const compraOk =  JSON.stringify(this.state.productos);

            const body = {
                token: token,
                usuario: {nombre: this.props.login.nombre , 
                    apellido: this.props.login.apellido , 
                    email: this.props.login.email , 
                    valor: this.state.sumatoria, 
                    celular: this.props.login.celular,
                    modalidad: this.state.modalidad,
                    direccion: this.state.direccion,
                    compra: this.state.productos,
                    compraOk: compraOk}


            }

            const res =  await  axios.post('https://tienda-cajas.herokuapp.com/auth/pagar', body)

            if(res.status === 200){
                this.setState({disp: 'block', color: 'green', mensaje: "Compra realizada con exito!", proceso:'', sumatoria: 0, value: ''})
                
                this.props.itemsCart.itemsCart.map(item => {
                    localStorage.setItem(`${item.nombre}`, '0')
                    this.setState({[item.nombre]: 0, proceso: ''})
                })
            }

            else {
                this.setState({disp: 'block', color: 'red', mensaje: "Hubo un error, vuelve a intentarlo!", proceso:'', sumatoria: 0, value: ''})
                this.props.itemsCart.itemsCart.map(item => {
                    localStorage.setItem(`${item.nombre}`, '0')
                    this.setState({[item.nombre]: 0, proceso: ''})
                })
            }

            setTimeout(() => {
                this.setState({disp: 'none'})
            },5000)

        }

    getTotal = () => {
        var sumatoria = 0



        this.props.itemsCart.itemsCart.map(item => (
            sumatoria = sumatoria + parseInt(localStorage.getItem(`${item.nombre}`))
        ))

            
            this.setState({sumatoria: sumatoria})
         

     
    }

    selectChange = (e) => {
        this.setState({modalidad: e.target.value})
        
    }

    direccion = (e) => {
        this.setState({direccion: e.target.value})
    }

    verState = () => {
      
        var listOk = []
        this.state.productos.map(item =>{
               const cantidad =this.state.productos.filter(i => i == item).length
               
                listOk.push({producto: item, cantidad: cantidad})
       })
        
    

        function removeDuplicates(myArr, prop) {
            return myArr.filter((obj, pos, arr) => {
                return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
            });
        }
        

        const listadoOk = removeDuplicates(listOk, "producto")
        this.setState({productos: listadoOk})


    }

    render() {
    return (
            <div className="cartContainer">

                     <h2>Carrito</h2>
                        
                    


                   {/* <table className="tableCart">
                        <tr>
                            <th>Producto</th>
                            <th>Descripción</th>
                            <th>Precio unitario</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                        </tr>
                        
                           
                        {   
                            this.props.itemsCart.itemsCart ? (this.props.itemsCart.itemsCart.map(item => (
                                

                               
                                    <tr key={item._id}>
                                        <td className="nombreCart"> <div className="nomfoto"> <img src={`http://localhost:4000/public/${item.imagen}`}  alt=""/> <p>{item.nombre} </p>  </div>  </td>
                                        <td className="descripcionCart">{item.descripcion}</td>
                                        <td className="precioCart" ><b>{item.precio} Bs </b></td>
                                        <td className="cantidad-delete"> <input id={`${item.precio}`} placeholder="cantidad" name={`${item.nombre}`} onChange={(e) => this.handleChange(e)} type="number" min="0"/> <button name={`${item.nombre}`} className={`${item.idList}`}  onClick={(e) => this.deleteItem(e)} id={`${item._id} `}>   ELIMINAR   </button>  </td>
                                        <td className="totTd"> 
                                        
                                      
                                                TOTAL: { localStorage.getItem(`${item.nombre}`)}
                                        </td>
                                    </tr>
                                  
                                    
                           
                        ))): <p>No tienes articulos agregados</p>   }
                                  
                                 

                    </table>
                    */}
                    {/* alternative cart */}  

                        
                    <div className="alt-cart">  

                        {
                            this.props.itemsCart.itemsCart ? (this.props.itemsCart.itemsCart.map(item => (

                                    <div key={item._id} className="alt-cart-item">
                                       <img src={`http://localhost:4000/public/${item.imagen}`}/>
                                        <p className="alt-nombre"> <b>Artículo: </b>     {item.nombre}</p>
                                        <p className="alt-descripcion"> <b>Descripción: </b>  {item.descripcion}</p>
                                        <p className="alt-precio"><b> Precio: </b> {item.precio} Bs</p>
                                        <div className="alt-inputs">
                                            <input id={`${item.precio}`} placeholder="cantidad" name={`${item.nombre}`}  onChange={(e) => this.handleChange(e)} type="number" min="0"/> 
                                            <button name={`${item.nombre}`} className={`${item.idList}`}  onClick={(e) => this.deleteItem(e)} id={item._id}>ELIMINAR   </button> 
                                        </div>
                                        
                                        <p className="alt-total"> <b> TOTAL: </b> {localStorage.getItem(`${item.nombre}`)}</p>

                                    </div>

                            ))):  (<p>No tienes articulos agregados</p> )
                        }

                    </div>


                    <div className="totalContainer">
                                        

                        <h3 className="total">
                                    <div className="containerComprar">  

                                    <div className="entrega">
                                            <h3>Seleccionar modalidad de entrega</h3> 
                                            <select value={this.state.modalidad} onChange={this.selectChange}   name="modalidad" id="modalidad">
                                            <option value="A domicilio">A domicilio</option>
                                            <option value="En tienda">En tienda</option>
                                            </select>
                                            <input name="direccion" onChange={this.direccion} type="text" placeholder="direccion"/>
                                        </div>

                                    {this.state.sumatoria !== 0 ? (<StripeCheckout 
                                        stripeKey="pk_test_51HDiBaCSBanEDAVORUTcRec1Fq1Y48zqjWVBtr3vjj6vC4detRg4xAH6owFJE1OCe3gZUtCJuRzCDOZmWBtcec3800YaWO3OSB" 
                                        token={this.pagar} 
                                        name="Comprar productos" 
                                        amount={this.state.sumatoria * 100}
                                        currency="BOB"
                                        email="matiasfour@gmail.com">
                                        

                                   
                                      
                                        <button className="pagar">Pagar </button>
                                    </StripeCheckout>) : <p> </p>  
                                    
                                    }
                                        <p> TOTAL A PAGAR : {this.state.sumatoria == isNaN ? 0 : this.state.sumatoria } Bs</p>
                                    </div> 
                           
                        </h3>
                        <p style={{fontSize: '20px'}}>{this.state.proceso}</p>
                        <PopUp 
                             
                            mensaje={this.state.mensaje}
                            color={this.state.color}
                            disp={this.state.disp}
                        />

                          
                     

                   
                    </div>
              
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        items: state.items,
        login: state.login,
        itemsCart: state.itemsCart
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchItems: () => {
            dispatch(fetchItems())
        },
        addToCart: (item) => {
            dispatch(addToCart(item))
        },
    
        getCartItems: (email) => {
            dispatch(getCartItems(email))
        },
        removeCartItem: (item) => {
            dispatch(removeCartItem(item))
        },
      
    
    }
    }
    
    
    
    export default connect(mapStateToProps, mapDispatchToProps)(carrito)



