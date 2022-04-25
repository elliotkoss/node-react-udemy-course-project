import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import { DAppProvider, Mainnet } from "@usedapp/core";
import App from './components/App';
import reducers from './reducers';

// Change this to your own Infura project id: https://infura.io/register
const REACT_APP_INFURA_PROJECT_ID = process.env.REACT_APP_INFURA_PROJECT_ID;
const config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: "https://mainnet.infura.io/v3/" + REACT_APP_INFURA_PROJECT_ID,
  },
}

const container = document.querySelector('#root');
const root = createRoot(container);
const store = createStore( reducers, {}, applyMiddleware(reduxThunk) );

root.render(
    <Provider store={store}>
        <DAppProvider config={config}>
            <App />
        </DAppProvider>
    </Provider>
);
