import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './client/redux/store';
import Main from './client/components/Main';
import style from './client/stylesheets/index.scss';

const socket = io(window.location.origin);

ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById('app') 
);

