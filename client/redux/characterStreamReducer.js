
//ACTION TYPES
const CURRENT_CHARACTER = "CURRENT_CHARACTER"

//ACTION CREATORS
export function setCurrentCharacter(character){
  return{
      type: CURRENT_CHARACTER,
      currentCharacter: character
  }
}

//THUNKS

export function currentCharacter(character){
    return function thunk(dispatch){
       return dispatch(setCurrentCharacter(character))
    }
}

//REDUCER
const intitialState = {};

function characterStreamReducer(state = intitialState, action){
    switch(action.type){
        case CURRENT_CHARACTER:
            return action.currentCharacter     
        default: 
            return state; 
    }
}

export default characterStreamReducer;

