import {combineReducers} from 'redux'

import listItemReducer from './listItems/listItemsReducer'
import categoriesReducer from './categories/categoriesReducer'
import registerReducer from './register/registerReducer'
import loginReducer from './login/loginReducer'
import cartReducer from './carrito/carritoReducer'
import buscadorReducer from './buscador/buscadorReducer'

const rootReducer = combineReducers({
    itemsCart: cartReducer,
    items: listItemReducer,
    categories: categoriesReducer,
    register:  registerReducer,
    login: loginReducer,
    buscador: buscadorReducer
    
   
})

export default rootReducer