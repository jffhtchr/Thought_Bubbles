import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class CharacterStream extends Component {
    constructor(props){
        super(props)
        this.state = {
            letters: ["A","B","C","D","E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
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
        this.forceUpdate() 
    }

    shiftLeft(){
        console.log('shifted Left!')
        var arr = this.state.letters;
        arr.unshift(arr.pop());
        var selectedCharacter = arr[Math.floor((arr.length-1)/2)];
        this.setState({letters: arr, selectedCharacter: selectedCharacter})
        this.forceUpdate() 
    }




    render() {

    return (
 
    <div id="character-stream-container">

        <button id="left-button" onClick={this.shiftLeft}>Shift Left</button>
        
        <div id="characters">
            <div id="left-characters">
                {this.state.letters.filter((letter, i)=>{
                    if(i<((this.state.letters.length/2)-1)){
                        return(
                            <p>{letter}</p>
                        )
                    }
                })}
            </div>

            <div id="selected-character">{this.state.selectedCharacter}</div>

            <div id="right-characters">
                {this.state.letters.filter((letter, i)=>{
                    if(i>((this.state.letters.length/2)-1)){
                        return(
                            <p>{letter}</p>
                        )
                    }
                })}
            </div>
        </div>

        <button id="right-button" onClick={this.shiftRight}>Shift Right</button>
    </div>


    );
    }
}
