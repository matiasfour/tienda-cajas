import {SEARCH_TRY , SEARCH_OK, SEARCH_FAIL} from './buscadorTypes'
import axios from 'axios'

export const searchTry =  ()  => {
    return {
        type: SEARCH_TRY
    }
}

export const searchOk =  (results)  => {
    return {
        type: SEARCH_OK,
        payload: results
    }
}

export const searchFail =  (error)  => {
    return {
        type: SEARCH_FAIL,
        payload: error
    }
}

export const search = (busqueda) => {
    
    return  (dispatch) => {
        dispatch(searchTry)
        
         axios.get('https://tienda-cajas.herokuapp.com/buscar/'+ busqueda)
        .then(res => {
            const results = res.data

            dispatch(searchOk(results))
           
            
        })

        .catch(error => {
            const errorMsg = error.message
            dispatch(searchFail(errorMsg))
        })
           }
}
