import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from "socket.io-client";
import { sendMessage } from './redux/sendMessageReducer';


class Chat extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            message: '',
            messages: [],
            updated: true
        };

        this.socket = io(window.location.origin);

        this.socket.on('RECIEVE_MESSAGE', function(data){
            addMessage(data);
        });
        
        const addMessage = data => {
            this.setState({messages: [...this.state.messages, data]});
        };


        this.sendMessage = () => {
            const userID = this.socket.id.slice(0,4)
            this.socket.emit('SEND_MESSAGE', {
                author: "USER " + userID,
                message: this.props.message
            });
        }
    }
   
    componentDidUpdate(){
        if(this.props.sendMessage === this.state.updated){
            this.setState({updated: !this.state.updated})
            this.sendMessage()
        }
    }

    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Chat</div>
                                <hr/>
                                <div className="messages">
                                {this.state.messages.map((message,i) => {
                                    return (
                                        <div key={i}>{message.author}: {message.message}</div>
                                    )
                                })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(storeState){
    return{
       message: storeState.message,
       sendMessage: storeState.sendMessage
    }
 }

 function mapDispatchToProps(dispatch){
    return{
        sendCurrentMessage(){
            dispatch(sendMessage())
        }
    }
}
const ChatContainer = connect(mapStateToProps, mapDispatchToProps)(Chat)
export default ChatContainer;