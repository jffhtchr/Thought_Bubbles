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

    componentWillMount(){
            if(this.state.updated === false ){
            var newMessage = this.state.message + this.props.chosenLetter
            if(newMessage !== "[object Object]")
            this.setState({
                message: newMessage,
                updated: true
            })  
        }  
    
    }


    componentDidMount(){
        console.log('COMPONENT MOUNTED@:',this.state )
        this.setState({
            updated: false
        })
    }

    

    componentWillReceiveProps(){
        if(this.state.updated === false ){
            var newMessage = this.state.message + this.props.chosenLetter
            // if(newMessage !== "[object Object]")
            console.log("%^%^%^%^%^%^%^%^%^")
            this.setState({
                message: newMessage,
                updated: true
            })  
        } 

    }

    handleSendMessage(){
        alert(`Message: "${this.state.message}" sent!`)
        this.setState({
            message:""
        })
    }

    render(props)  {
        
        var current = [this.props.chosenLetter]
      if(current !== ""){  
        console.log("PROPOPOPS:", this.props)
    return (
    
    <div id="top-component">
        <div id="message-field-container">
        {this.state.message}

            {/* <p>{current.map(index=>{
                // console.log("INDEX", index)
                return index
            })}</p> */}
        </div>
        <button onClick ={this.handleSendMessage}>Send!</button>
    </div>    

    );
    }}
}

function mapStateToProps(storeState){
    return{
       currentCharacter: storeState.characterStream,
       chosenLetter: storeState.chosenLetter
    }
 }

const MessageFieldContainer = connect(mapStateToProps)(MessageField)
export default MessageFieldContainer;