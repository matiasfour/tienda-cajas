import {GET_CATEGORIES, GET_CATEGORIESOK, GET_FAIL} from './categoriesTypes'
import axios from 'axios'








 export const getCategories =  ()  => {
    return {
        type: GET_CATEGORIES
    }
}


export const getCategoriesOk = (categories) => {
    return {
        type: GET_CATEGORIESOK,
        payload: categories
    }
}

export const getFail = (error) => {
    return {
        type: GET_FAIL,
        payload: error
    }
}


export const fetchCategories = () => {
    return async (dispatch) => {
        dispatch(getCategories)
            
        axios.get('https://tienda-cajas.herokuapp.com/categorias', {
            mode:'cors'
        })
        .then(res => {
            const categories = res.data
            dispatch(getCategoriesOk(categories))
            console.log(categories);
        })

        .catch(error => {
            const errorMsg = error.message
            dispatch(getFail(errorMsg))
        })
           
        
        

    }
}


