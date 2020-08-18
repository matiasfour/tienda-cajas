import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import listItemReducer from './listItems/listItemsReducer'
import rootReducer from './rootReducer'


const store = createStore(rootReducer,
    composeWithDevTools(applyMiddleware(thunk))) ;



export default store