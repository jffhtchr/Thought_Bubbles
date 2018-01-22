import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { setCurrentCharacter, currentCharacter } from './redux/characterStreamReducer'

class CharacterStream extends Component {
    constructor(props){
        super(props)
        this.state = {
            letters: [" ", "A","B","C","D","E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
            selectedCharacter: "M"
        }
        this.shiftLeft = this.shiftLeft.bind(this);
        this.shiftRight = this.shiftRight.bind(this)
    }

    shiftRight(){
        console.log('shifted Right!')
        var arr = this.state.letters;
        arr.slice(0, 3).join(",");
        arr.push(arr.shift());
        var selectedCharacter = arr[Math.floor((arr.length-1)/2)];
        this.setState({letters: arr, selectedCharacter: selectedCharacter})
    }

    shiftLeft(){
        console.log('shifted Left!')
        var arr = this.state.letters;
        arr.unshift(arr.pop());
        var selectedCharacter = arr[Math.floor((arr.length-1)/2)];
        this.setState({letters: arr, selectedCharacter: selectedCharacter})
    }


    render() {

    return (
 
    <div id="character-stream-container">

        <button id="left-button" onClick={this.shiftLeft}>Shift Left</button>
        
        <div id="characters">
            <div id="left-characters">
                {this.state.letters.filter((letter, i)=>{
                    if(i<(Math.floor(this.state.letters.length/2))){
                        return(
                            <p>{letter}</p>
                        )
                    }
                })}
            </div>

            <div id="selected-character">{this.state.selectedCharacter}</div>

            <div id="right-characters">
                {this.state.letters.filter((letter, i)=>{
                    if(i>(Math.floor(this.state.letters.length/2))){
                        return(
                            <p>{letter}</p>
                        )
                    }
                })}
            </div>
        </div>

        <button id="right-button" onClick={this.shiftRight}>Shift Right</button>
        <button id="new-button" onClick={()=>this.props.selectCharacter(this.state.selectedCharacter)}>Select Character</button>
    </div>


    );
    }
}

function mapStateToProps(storeState){
   return{
      currentCharacter: storeState.characterStream
   }
}

function mapDispatchToProps(dispatch){
    return{
        selectCharacter(character){
            dispatch(setCurrentCharacter(character))
        }
    }
}

const CharacterStreamContainer = connect(mapStateToProps, mapDispatchToProps)(CharacterStream)
export default CharacterStreamContainer;