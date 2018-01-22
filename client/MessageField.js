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
        console.log("updated:", this.state)
    }

    componentWillReceiveProps(){
        this.setState({
            updated: false
        }) 
    }

    render() {
    return (
 
    <div id="message-field-container">
       <p>{this.state.message}</p>
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