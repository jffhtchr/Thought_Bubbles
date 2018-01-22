import { createStore, combineReducers, applyMiddleware } from 'redux';
import characterStream from './characterStreamReducer';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'


const rootReducer = combineReducers({
    characterStream
  })

const middleware = composeWithDevTools(applyMiddleware(
    thunkMiddleware
))

const store = createStore(rootReducer, middleware)  
  
export default rootReducer
export * from './characterStreamReducer'