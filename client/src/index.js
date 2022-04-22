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
const INFURA_PROJECT_ID = "defba93b47f748f09fcead8282b9e58e";
const config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: "https://mainnet.infura.io/v3/" + INFURA_PROJECT_ID,
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
    </Provider>,
    document.getElementById("root")
);
