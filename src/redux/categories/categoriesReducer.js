import {GET_CATEGORIES, GET_CATEGORIESOK, GET_FAIL} from './categoriesTypes'


export const initialState = {
    categories: [],
    loading: false,
    error: ''

}


const categoriesReducer = (state= initialState, action ) => {
    switch(action.type){
        case GET_CATEGORIES: 
        
        return {
            ...state,
            loading: true,
           
        }

        case GET_CATEGORIESOK:
            
        return {
                loading: false,
                categories: action.payload,
                error: ''

        }

        case GET_FAIL:
            
            return {
                    loading: false,
                    categories: [],
                    error: action.payload
    
            }


            default: return state    



    }
}


export default categoriesReducer