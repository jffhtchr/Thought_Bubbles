import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { selectCurrentCharacter } from './redux/selectedLetterReducer';


class MessageField extends Component {
    constructor(props){
        super(props)

        this.state = {
            message:"",
            updated: false,
            letter:""
        }
        this.handleSendMessage = this.handleSendMessage.bind(this)
    }

    componentDidMount(){
        this.setState({
            updated: false
        })
    }

    componentDidUpdate(){
        if(this.state.updated === false ){
            var newMessage = this.state.message + this.props.currentCharacter
            if(newMessage !== "[object Object]")
            this.setState({
                message: newMessage,
                updated: true
            })  
        }      
    }

    componentWillReceiveProps(){
        this.setState({
            updated: false
        }) 
    }

    handleSendMessage(){
        alert(`Message: "${this.state.message}" sent!`)
        this.setState({
            message:""
        })
    }

    render()  {
    return(

    <div id="top-component">
        <div id="message-field-container">
            <p>{this.state.message}</p>
        </div>
        <button onClick ={this.handleSendMessage}>Send!</button>
    </div>    

    );
    }
}

function mapStateToProps(storeState){
    return{
       currentCharacter: storeState.characterStream,
       chosenLetter: storeState.chosenLetter
    }
 }

const MessageFieldContainer = connect(mapStateToProps)(MessageField)
export default MessageFieldContainer;