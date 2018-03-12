//ACTION TYPES
const ADD_CHARACTER_TO_MESSAGE = "ADD_CHARACTER_TO_MESSAGE";
const CLEAR_MESSAGE = 'CLEAR_MESSAGE';
const BACKSPACE = 'BACKSPACE';

//ACTION CREATORS
export function selectCurrentCharacter(character){
  return{
      type: ADD_CHARACTER_TO_MESSAGE,
      selectedCharacter: character
  }
}

export function clearCurrentMessage(){
    return{
        type: CLEAR_MESSAGE,
        message: ""
    }
}

export function clearLastCharacter(){
    return {
        type: BACKSPACE
    }
}


//REDUCER
const intitialState = "";

function messageReducer(state = intitialState, action){
    switch(action.type){
        case ADD_CHARACTER_TO_MESSAGE:
            return state + action.selectedCharacter 
        case CLEAR_MESSAGE:
            return action.message   
        case BACKSPACE: 
            let newState = state.slice(0,-1);
            return newState
        default: 
            return state; 
    }
}

export default messageReducer;
