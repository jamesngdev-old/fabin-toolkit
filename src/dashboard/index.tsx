import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import './themes/dark/style.scss';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
