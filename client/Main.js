import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// ---- components ---- //
import MessageFieldContainer from "./MessageField";
import VideoContainer from './Video';
import CharacterSelectorContainer from "./CharacterSelector";
import ChatContainer from './Chat';

export default class Main extends Component {
    render() {
        return (
            <div id = "wrapper">
                <div id = "chat-container">
                    <ChatContainer />
                </div>    
                <div id="main-container">
                    <div id="title">
                        <h1>Thought Bubbles</h1>
                    </div>
                    <MessageFieldContainer /> 
                    <VideoContainer />  
                    <CharacterSelectorContainer />
                </div>
                
            </div>
        );
    }
}