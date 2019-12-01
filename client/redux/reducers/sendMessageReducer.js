//ACTION TYPES
const SEND_MESSAGE = "SEND_MESSAGE"

//ACTION CREATORS
export function sendMessage(){
  return{
      type: SEND_MESSAGE,
  }
}


//REDUCER
const intitialState = false;

function sendMessageReducer(state = intitialState, action){
    switch(action.type){
        case SEND_MESSAGE:
            return !state;    
        default: 
            return state; 
    }
}

export default sendMessageReducer;
