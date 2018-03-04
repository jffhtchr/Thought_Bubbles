
//ACTION TYPES
const CURRENT_ALPHABET = "CURRENT_ALPHABET";
const TEST = 'TEST';

//ACTION CREATORS
export function setAlphabetArray(alphabet){
  return{
      type: CURRENT_ALPHABET,
      currentAlphabet: alphabet
  }
}


//REDUCER
const intitialState = [" ", "A","B","C","D","E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

function alphabetReducer(state = intitialState, action){
    switch(action.type){
        case CURRENT_ALPHABET:
            return action.currentAlphabet;    
        default: 
            return state; 
    }
}

export default alphabetReducer;

