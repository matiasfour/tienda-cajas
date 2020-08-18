import {CART, ADDING_TO_CART, TRY_ADD_CART, ADD_CART_OK,ADD_CART_FAIL, 
    TRY_REMOVE_CART, REMOVE_CART_OK, REMOVE_CART_FAIL,
    TRY_GET_CART,GET_CART_OK,GET_CART_FAIL, REMOVE_2} from './carritoTypes'
import { items } from '../listItems/listItemsActions'


const initialState = {
    itemsCart: [],
  
    loading: false,
    error: ''

}


const carritoReducer = (state= initialState, action ) => {
    switch(action.type){

        case ADDING_TO_CART:
            state.itemsCart = localStorage.setItem('cartItems',JSON.stringify([...state.itemsCart,action.payload]))
        return {
            
            itemsCart:  JSON.parse(localStorage.getItem('cartItems'))
         
        }
       
        case CART:
            return {
                ...state.itemsCart
            }

        case TRY_ADD_CART: 
            
            return {
            ...state,
            loading: true,
            error: ''
        }

        case ADD_CART_OK:

            return {
                loading: false,
                error: ''
            }

        case ADD_CART_FAIL:
            
            return {
                loading: false,
                itemsCart: [],
                error: action.payload
            }


        case TRY_GET_CART:
            
            return {
                loading: true,
                ...state,
                error: ''
        }

        case GET_CART_OK:

            return {
                loading: false,
                itemsCart: action.payload,
                error: ''
            }

        case GET_CART_FAIL:
            
            return {
                loading: false,
                ...state.itemsCart,
                error: action.payload
            }

        case TRY_REMOVE_CART: {

            

            return {
                loading: true,
                ...state.itemsCart,
                error: ''
            }
        }    

        case REMOVE_CART_OK: {
            return {
                loading: false,
                
                error: ''
            }
        }  


        case REMOVE_CART_OK: {
            return {
                loading: false,
                
                error: action.payload
            }
        }  


        case REMOVE_2: {

            state.itemsCart.filter(item => item._id != action.payload)

            return {
                loading: true,
                ...state.itemsCart,
                error: ''
            }
        }   

      
       



            default: return state    



    }
}


export default carritoReducer