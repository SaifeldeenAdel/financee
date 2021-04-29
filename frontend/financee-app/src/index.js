import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, compose  } from 'redux'
import reducer from './redux/reducers/reducer'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

// Creating store and using redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))


const MyAppWithStore = () => (
    <Provider store={store}>
        <App />
    </Provider>
    );


ReactDOM.render(
    <MyAppWithStore />,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
