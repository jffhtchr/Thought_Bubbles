import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import CharacterStream from "./CharacterStream";
import CharacterSelectorContainer from "./CharacterSelector";
import VideoContainer from './Video';
import MessageFieldContainer from "./MessageField";

export default class Main extends Component {
    render() {

    return (
        <div id="main-container">
            <div id="title">
                <h1>Jeff Text</h1>
                <p>by Jeff</p>
            </div>    
            <MessageFieldContainer /> 
            <VideoContainer />  
            <CharacterSelectorContainer />
            {/* <CharacterStream /> */}
        </div>
    );
    }
}