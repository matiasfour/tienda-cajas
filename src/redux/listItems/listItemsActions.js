import {GET_ITEMS, GET_ITEMSOK, GET_FAIL, ITEMS} from './listItemsTypes'
import axios from 'axios'





export const items = () => {
    return {
        type: ITEMS
    }
}


 export const getItems =  ()  => {
    return {
        type: GET_ITEMS
    }
}


export const getItemsOk = (items) => {
    return {
        type: GET_ITEMSOK,
        payload: items
    }
}

export const getFail = (error) => {
    return {
        type: GET_FAIL,
        payload: error
    }
}


export const fetchItems = () => {
    return async (dispatch) => {
        dispatch(getItems)
            
        axios.get('https://tienda-cajas.herokuapp.com/', {
            mode:'cors'
        })
        .then(res => {
            const items = res.data
            dispatch(getItemsOk(items))
        })

        .catch(error => {
            const errorMsg = error.message
            dispatch(getFail(errorMsg))
        })
           
        
        

    }
}

export const getFilterItems = () => {
    return (dispatch) => {
        dispatch(items);
    }
}


