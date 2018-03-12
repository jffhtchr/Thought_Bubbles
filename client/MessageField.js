import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { clearCurrentMessage } from './redux/messageReducer';
import { sendMessage } from './redux/sendMessageReducer';

class MessageField extends Component {
    constructor(props){
        super(props)
        this.state = {
            firstUpdate: 0
        }
    }

    componentWillReceiveProps(){   
        this.forceUpdate();
    }

    componentDidUpdate(){
        //acts a buffer for initial unintentional motion triggers
        let counter = this.state.firstUpdate + 1;
        if(counter<=3){
            this.setState({firstUpdate:counter})
            this.props.clearMessage();
        }
    }

    render(props)  {
      var current = [this.props.message]
      if(current){  
        return (
            <div id="top-component">
                <div id="message-field-container">
                    <p>{current.map(index=>{
                        if(this.state.firstUpdate === 3){
                            return index
                        }   
                        })}</p>
                </div>
            </div>    

        );
    }}
}

function mapStateToProps(storeState){
    return{
       message: storeState.message
    }
 }
 
 function mapDispatchToProps(dispatch){
     return{
         clearMessage(){
             dispatch(clearCurrentMessage())
         }
     }
 }

const MessageFieldContainer = connect(mapStateToProps, mapDispatchToProps)(MessageField)
export default MessageFieldContainer;