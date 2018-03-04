//ACTION TYPES
const SELECT_CURRENT_CHARACTER = "CURRENT_CHARACTER";

//ACTION CREATORS
export function selectCurrentCharacter(character){
  return{
      type: SELECT_CURRENT_CHARACTER,
      currentCharacter: character
  }
}

//REDUCER
const intitialState = "";

function chosenLetterReducer(state = intitialState, action){
    switch(action.type){
        case SELECT_CURRENT_CHARACTER:
            return state + action.currentCharacter     
        default: 
            return state; 
    }
}

export default chosenLetterReducer;

