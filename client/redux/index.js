import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

//reducers
import alphabet from './alphabetReducer';
import motionEventLeft from './motionEventLeftReducer';
import motionEventRight from './motionEventRightReducer';
import message from './messageReducer';

const rootReducer = combineReducers({
    alphabet,
    motionEventLeft,
    motionEventRight,
    message
})

const middleware = composeWithDevTools(applyMiddleware(
    thunkMiddleware
))

const store = createStore(rootReducer, middleware)  
  
export default rootReducer;
