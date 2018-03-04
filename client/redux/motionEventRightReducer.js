//ACTION TYPES
const SHIFT_RIGHT = "SHIFT_RIGHT";

//ACTION CREATORS
export function rightMotionEvent(){
  return{
      type: SHIFT_RIGHT,
  }
}


//REDUCER
const intitialState = false;

function motionEventRightReducer(state = intitialState, action){
    switch(action.type){
        case SHIFT_RIGHT:
            return !state;    
        default: 
            return state; 
    }
}

export default motionEventRightReducer;