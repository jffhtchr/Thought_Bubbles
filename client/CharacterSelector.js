import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { setCurrentCharacter } from './redux/characterStreamReducer';
import { setAlphabetArray } from './redux/alphabetReducer';
import { browserHistory } from 'react-router'; 

class CharacterSelector extends Component {
    constructor(props){
        super(props)
        this.state ={
            letters: this.props.currentAlphabet
        }
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
                            <p>{letter}</p>
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
      currentCharacter: storeState.characterStream,
      currentAlphabet: storeState.alphabet
   }
}

const CharacterSelectorContainer = connect(mapStateToProps)(CharacterSelector)
export default CharacterSelectorContainer;