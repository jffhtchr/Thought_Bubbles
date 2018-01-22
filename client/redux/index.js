import { createStore, combineReducers, applyMiddleware } from 'redux';
import characterStream from './characterStreamReducer';
import alphabet from './alphabetReducer';
import chosenLetter from './selectedLetterReducer'
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'


const rootReducer = combineReducers({
    characterStream,
    alphabet,
    chosenLetter
})

const middleware = composeWithDevTools(applyMiddleware(
    thunkMiddleware
))

const store = createStore(rootReducer, middleware)  
  
export default rootReducer;
export * from './characterStreamReducer';
export * from './alphabetReducer';
export * from './selectedLetterReducer';