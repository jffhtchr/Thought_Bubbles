import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';


class MessageField extends Component {
    constructor(props){
        super(props)

        this.state = {
            message:"",
            updated: false
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

    render() {
    return (

    <div id="top-component">
        <div id="message-field-container">
            <p>{this.state.message}</p>
        </div>
        <button onClick ={this.handleSendMessage}>Send Message!</button>
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

const MessageFieldContainer = connect(mapStateToProps, mapDispatchToProps)(MessageField)
export default MessageFieldContainer;