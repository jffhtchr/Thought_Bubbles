// import axios from 'axios';

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

// export function fetchCampuses(){
//    return function thunk(dispatch){
//        return axios.get(`/api/campuses/`)
//        .then(response => response.data)
//        .then(campuses => {
//           dispatch(gotCampusesFromServer(campuses))
//        })
//        .catch(console.error)
//    }  
// }


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




// function characterStreamReducer (state = {}, action) {
//     return state;
//   }