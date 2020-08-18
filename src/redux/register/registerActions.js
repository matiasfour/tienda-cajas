import {REGISTER_TRY, REGISTER_OK, REGISTER_FAIL} from './registerTypes'
import axios from 'axios'



export const registerTry =  ()  => {
    return {
        type: REGISTER_TRY
    }
}


export const registerOk = (token) => {
    
    return {
        type: REGISTER_OK,
        payload: token
    }
}

export const registerFail = (error) => {
    return {
        type: REGISTER_FAIL,
        payload: error
    }
}



export const register = (usuario) => {
    const user = usuario
    return  (dispatch) => {
        dispatch(registerTry)
        
         axios.post('https://tienda-cajas.herokuapp.com/auth/registro',user)
        .then(res => {
            const token = res.data
           
            dispatch(registerOk(token))
        })

        .catch(error => {
            const errorMsg = error.message
            dispatch(registerFail(errorMsg))
        })
           
        

       /* const res = await axios.post('https://localhost:4000/auth/registro', usuario)

        if(res.status === 200){
            const token = res.data.token

            dispatch(registerOk(token))
        }

        else {
            const error = res.
            dispatch(registerFail)
        }*/
        

    }
}