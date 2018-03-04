import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

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

    handleSendMessage(){
        alert(`Message: "${this.props.message}" sent!`)
    }

    render(props)  {
      var current = [this.props.message]
      if(current !== ""){  
        
        return (
    
            <div id="top-component">
                <div id="message-field-container">
                    <p>{current.map(index=>{
                        return index
                        })}</p>
                </div>
                <button onClick ={this.handleSendMessage}>Send!</button>
            </div>    

        );
    }}
}

function mapStateToProps(storeState){
    return{
       message: storeState.message
    }
 }

const MessageFieldContainer = connect(mapStateToProps)(MessageField)
export default MessageFieldContainer;