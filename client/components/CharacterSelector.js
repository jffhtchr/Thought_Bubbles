import React, { Component } from 'react';
import { connect } from 'react-redux';

class CharacterSelector extends Component {
    constructor(props){
        super(props)
    }

    componentWillReceiveProps(){   
        this.forceUpdate();
    }

    render() {
    return (
 
    <div className="character-stream-container">
        
        <div className="characters">
        
            <div className="left-characters">
                {this.props.currentAlphabet.map((letter, i)=>{
                    if(i<(Math.floor(this.props.currentAlphabet.length/2))){
                        return( 
                            <p key={i}>{letter}</p>
                        )
                    }
                })}
            </div>

            <div className="selected-character">{this.props.currentAlphabet[Math.floor(this.props.currentAlphabet.length/2)]}</div>

            <div className="right-characters">
                {this.props.currentAlphabet.map((letter, i)=>{
                    if(i>(Math.floor(this.props.currentAlphabet.length/2))){
                        return(
                            <p key={i}>{letter}</p>
                        )
                    }
                })}
            </div>
            </div>
       

    </div>


    );
    }
}

function mapStateToProps(storeState){
   return{
      currentAlphabet: storeState.alphabet,
      motionEventLeft: storeState.motionEventLeft,
      motionEventRight: storeState.motionEventRight
   }
}

const CharacterSelectorContainer = connect(mapStateToProps)(CharacterSelector)
export default CharacterSelectorContainer;