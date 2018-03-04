//ACTION TYPES
const SHIFT_LEFT = "SHIFT_LEFT";

//ACTION CREATORS
export function leftMotionEvent(){
  return{
      type: SHIFT_LEFT,
  }
}


//REDUCER
const intitialState = false;

function motionEventLeftReducer(state = intitialState, action){
    switch(action.type){
        case SHIFT_LEFT:
            return !state;    
        default: 
            return state; 
    }
}

export default motionEventLeftReducer;

