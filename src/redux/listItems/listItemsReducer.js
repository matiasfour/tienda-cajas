import {GET_ITEMS, GET_ITEMSOK, GET_FAIL, ITEMS} from './listItemsTypes'


const initialState = {
    items: [],
    loading: false,
    error: ''

}


const listItemReducer = (state= initialState, action ) => {
    switch(action.type){

        case ITEMS:  
        
        return {
            ...state.items
        }

        case GET_ITEMS: 
        
        return {
            ...state,
            loading: true,
           
        }

        case GET_ITEMSOK:
            
        return {
                loading: false,
                items: action.payload,
                error: ''

        }

        case GET_FAIL:
            
            return {
                    loading: false,
                    items: [],
                    error: action.payload
    
            }


            default: return state    



    }
}


export default listItemReducer