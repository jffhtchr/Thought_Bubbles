import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'; 

class CharacterSelector extends Component {
    constructor(props){
        super(props)
    }

    componentWillReceiveProps(){   
        this.forceUpdate();
    }

    render() {
    return (
 
    <div id="character-stream-container">
        
        <div id="characters">
        
            <div id="left-characters">
                {this.props.currentAlphabet.filter((letter, i)=>{
                    if(i<(Math.floor(this.props.currentAlphabet.length/2))){
                        return(
                            <div className="letterz">{letter}</div>
                        )
                    }
                })}
            </div>

            <div id="selected-character">{this.props.currentAlphabet[Math.floor(this.props.currentAlphabet.length/2)]}</div>

            <div id="right-characters">
                {this.props.currentAlphabet.filter((letter, i)=>{
                    if(i>(Math.floor(this.props.currentAlphabet.length/2))){
                        return(
                            <p>{letter}</p>
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