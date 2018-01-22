import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import {connect} from "react-redux"; 
import store from './client/store';
import Main from './client/Main';


ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById('app') 
);