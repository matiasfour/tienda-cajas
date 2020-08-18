import {REGISTER_TRY, REGISTER_OK, REGISTER_FAIL} from './registerTypes'

const initialState = {
    token: localStorage.getItem('token'),
    loading: false,
    error: ''

}


const registerReducer = (state = initialState, action) => {

    switch(action.type){

        case REGISTER_TRY:

        return {
            ...state,
            loading: true
        }


        case REGISTER_OK:
            localStorage.setItem('token', action.payload.token)

            return {
                loading: false,
                token: action.payload,
                error: ''
            }

            case REGISTER_FAIL:

                return{
                    loading: false,
                    token: null,
                    error: action.payload
                }
        default:
            return state;

    }

}


export default registerReducer

