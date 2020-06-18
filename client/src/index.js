import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import postReducer from './reducers/postReducers'
import { fetchAllPost } from './actions/postAction'

const store = createStore(postReducer, applyMiddleware(thunk));
store.dispatch(fetchAllPost());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root')
);
