import React, { Component } from 'react';

// ---- components ---- //
import MessageFieldContainer from "./MessageField";
import VideoContainer from './Video';
import CharacterSelectorContainer from "./CharacterSelector";
import ChatContainer from './Chat';

export default class Main extends Component {
    render() {
        return (
            <div className="app__wrapper">
                <div className="chat-container">
                    <ChatContainer />
                </div>    
                <div className="main-container">
                    <div className="main__title">
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