import {LOGIN_TRY, LOGIN_OK, LOGIN_FAIL, LOGOUT} from './loginTypes'
import axios from 'axios'

export const loginTry =  ()  => {
    return {
        type: LOGIN_TRY
    }
}


export const loginOk = (userData) => {
    
    return {
        type: LOGIN_OK,
        payload: userData
    }
}

export const loginFail = (error) => {
    return {
        type: LOGIN_FAIL,
        payload: error
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}



export const login = (usuario) => {
    
    return  (dispatch) => {
        dispatch(loginTry)
        
         axios.post('https://tienda-cajas.herokuapp.com/auth/login',usuario)
        .then(res => {
            const token = res.data.token
            const usuario = res.data.usuario

            const userData = {token: token, usuario: usuario}
           
            dispatch(loginOk(userData))
        })

        .catch(error => {
            const errorMsg = error.message
            dispatch(loginFail(errorMsg))
        })
           
        

  

    }
}
