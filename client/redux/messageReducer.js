//ACTION TYPES
const ADD_CHARACTER_TO_MESSAGE = "ADD_CHARACTER_TO_MESSAGE";

//ACTION CREATORS
export function selectCurrentCharacter(character){
  return{
      type: ADD_CHARACTER_TO_MESSAGE,
      selectedCharacter: character
  }
}

//REDUCER
const intitialState = "";

function messageReducer(state = intitialState, action){
    switch(action.type){
        case ADD_CHARACTER_TO_MESSAGE:
            return state + action.selectedCharacter     
        default: 
            return state; 
    }
}

export default messageReducer;
