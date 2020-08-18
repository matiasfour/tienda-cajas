import {LOGIN_TRY, LOGIN_OK, LOGIN_FAIL, LOGOUT} from './loginTypes'

const initialState = {
    token: localStorage.getItem('token'),
    nombre: localStorage.getItem('nombre'),
    apellido: localStorage.getItem('apellido'),
    email: localStorage.getItem('email'),
    celular: localStorage.getItem('celular'),
    ciudad: localStorage.getItem('ciudad'),
    loading: false,
    validUser: null,
    error: ''

}


const loginReducer = (state = initialState, action) => {

    switch(action.type){

        case LOGIN_TRY:

        return {
            ...state,
            loading: true
        }


        case LOGIN_OK:
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('nombre',action.payload.usuario.nombre)
            localStorage.setItem('email',action.payload.usuario.email)
            localStorage.setItem('apellido',action.payload.usuario.apellido)
            localStorage.setItem('celular',action.payload.usuario.celular)
            localStorage.setItem('ciudad',action.payload.usuario.ciudad)

            return {
                loading: false,
                token: action.payload.token,
                validUser: action.payload.usuario,
                nombre: action.payload.usuario.nombre,
                email: action.payload.usuario.email,
                apellido: action.payload.usuario.apellido,
                celular: action.payload.usuario.celular,
                ciudad: action.payload.usuario.ciudad,
                error: ''
            }

            case LOGIN_FAIL:

                return{
                    loading: false,
                    token: null,
                    error: action.payload
                }

            case LOGOUT:

            return {
                loading: false,
                token: null,
                validUser: null
            }
        default:
            return state;

    }

}


export default loginReducer

