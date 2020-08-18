import {CART, ADDING_TO_CART, TRY_ADD_CART, ADD_CART_OK,ADD_CART_FAIL, 
    TRY_REMOVE_CART, REMOVE_CART_OK, REMOVE_CART_FAIL,
    TRY_GET_CART,GET_CART_OK,GET_CART_FAIL, REMOVE_2} from './carritoTypes'
import axios from 'axios'

export const cart = () => {
    return {
        type: CART
    }
}

export  const addingToCart = (item) => {
    return {
        type: ADDING_TO_CART,
        payload: item
    }
}

/*-------------------------------------------------------*/

export const tryAddCart = () => {
    return {
        type: TRY_ADD_CART
    }
}

export const addCartOk = (item) => {
    return {
        type: ADD_CART_OK,
        payload: item
    }
}

export const addCartFail = (error) => {
    return {
        type: ADD_CART_FAIL,
        payload: error
    }
}



export const tryGetCart = () => {
    return {
        type: TRY_GET_CART
    }
}

export const getCartOk = (cartItems) => {
    return {
        type: GET_CART_OK,
        payload: cartItems
    }
}

export const getCartFail = (error) => {
    return {
        type: GET_CART_FAIL,
        payload: error
    }
}

export const tryRemoveCart = () => {
    return {
        type: TRY_REMOVE_CART
    }
}

export const removeCartOk = (item) => {
    return {
        type: REMOVE_CART_OK,
        payload: item
    }
}

export const removeCartFail = (error) => {
    return {
        type: REMOVE_CART_FAIL,
        payload: error
    }
}

export const remove2 = (item) => {

    return {
    type: REMOVE_2,
    payload: item

    }
}

/*---------------------------------------------------*/

export const addToCart  = (item) => {
    return (dispatch) => {
        dispatch(tryAddCart)

        axios.post('https://tienda-cajas.herokuapp.com/auth/addCart', item)

        .then(res => {

        

          
            const item = res.data
            dispatch(addCartOk)
            

       

          
        })
        .catch((error) => {
            
            dispatch(addCartFail(error.message))
        })

}


}

export const getCartItems = (email) => {
    return (dispatch) => {
        dispatch(tryAddCart)

        axios.get(`http://localhost:4000/auth/getCart/${email}`)

        .then(res => {
            const cartItems = res.data
            dispatch(getCartOk(cartItems))
        })

        .catch(error => {
            const errormsg = error.messsage
            dispatch(getCartFail)
        })

        


    }
}


export const removeCartItem = (item) => {
    return  (dispatch) => {
        dispatch(tryRemoveCart)
        dispatch(remove2)
         axios.delete(`http://localhost:4000/auth/removeCartItem/${item}`)
        .then(res => {
            const deleted = res.data;
            dispatch(removeCartOk)
        })

        .catch(error => {
            const errormsg = error.message

            dispatch(removeCartFail)
        })
    }
}

