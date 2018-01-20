import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CharacterStream from "./CharacterStream";
import Video from './Video';
import MessageField from "./MessageField";

export default class Main extends Component {
    render() {

    return (
 
    <div id="main-container">

        <CharacterStream />
        <Video />
        <MessageField />

    </div>

    );
    }
}