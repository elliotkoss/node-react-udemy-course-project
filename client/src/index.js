import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App'; 
import reducers from './reducers';

//Development-only. Axios helpers
import axios from 'axios';
window.axios = axios;

const container = document.querySelector('#root');
const root = createRoot(container);
const store = createStore( reducers, {}, applyMiddleware(reduxThunk) );

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);