import {SEARCH_TRY , SEARCH_OK, SEARCH_FAIL} from './buscadorTypes'


const initialState = {
    results : [],
    error: '',
    loading: false

}

const buscadorReducer = (state = initialState, action) => {
    switch(action.type){

        case SEARCH_TRY: 

        return {
            ...state,
            loading: true
        }

        case SEARCH_OK: 
            localStorage.removeItem('results');
            localStorage.setItem('results', JSON.stringify(action.payload))
        return{
                loading: false,
                results: action.payload,
                error: ''
        }

        case SEARCH_FAIL: 
         return {
             loading: false,
             error: action.payload,
             results: []

         }

         default: return state


        
    }
}

export default buscadorReducer;