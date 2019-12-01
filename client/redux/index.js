import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

//reducers
import alphabet from './reducers/alphabetReducer';
import motionEventLeft from './reducers/motionEventLeftReducer';
import motionEventRight from './reducers/motionEventRightReducer';
import message from './reducers/messageReducer';
import sendMessage from './reducers/sendMessageReducer';

const rootReducer = combineReducers({
    alphabet,
    motionEventLeft,
    motionEventRight,
    message,
    sendMessage
})

const middleware = composeWithDevTools(applyMiddleware(
    thunkMiddleware
))
  
export default rootReducer;
