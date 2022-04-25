import React, { Component, useEffect, useState, useReducer } from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { shortenAddress } from "@usedapp/core";

import Header from './Header';
import Landing from './Landing';

const REACT_APP_INFURA_PROJECT_ID = process.env.REACT_APP_INFURA_PROJECT_ID;
const web3Modal = new Web3Modal({
    network: "mainnet",
    cacheProvider: true,
    providerOptions: {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                infuraId: REACT_APP_INFURA_PROJECT_ID
            }
       }
    }
});

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

function WalletButton() {
    const [instance, setInstance] = useState();
    const [provider, setProvider] = useState();
    const [signer, setSigner] = useState();
    const [account, setAccount] = useState("");
    const [ens, setEns] = useState("");
    const [wallet, setWallet] = useState("");

    const [error, setError] = useState("");

    useEffect(() => {
        const lookupEns = async () => {
            try {
                if (account && provider) {
                    const ens = await provider?.lookupAddress(account)
                    setEns(ens)
                }
            } catch (error) {
                console.error('Caught erorr in lookupEns')
                setError(error)
            }
        }
        lookupEns()
    }, [account, provider])

    useEffect(() => {
        if (ens) {
            setWallet(ens);
        } else if (account) {
            setWallet(shortenAddress(account));
        } else {
            setWallet("");
        }
    }, [account, ens, setWallet]);

    useEffect(() => {
        if (error) {
            console.error("Error while connecting wallet:", error.message);
        }
    }, [error]);

    useEffect(() => {
        if (web3Modal.cachedProvider) {
            connectWallet();
        }
    }, []);

    const connectWallet = async () => {
        try {
            const instance = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(instance);
            const signer = provider.getSigner();
            const accounts = await provider.listAccounts();
            setInstance(instance);
            setSigner(signer);
            setProvider(provider);
            if (accounts) {
                setAccount(accounts[0]);
            }
        } catch (error) {
            console.error("Caught error in connectWallet")
            setError(error)
        }
    }

    const disconnectWallet = async () => {
        try {
            await web3Modal.clearCachedProvider();
            setInstance()
            setProvider()
            setSigner()
            setAccount("")
            setWallet("")
        } catch (error) {
            console.error("Caught error in disconnectWallet")
            setError(error)
        }
    }

    const connectOrDisconnectWallet = async () => {
        if (!wallet) {
            connectWallet()
        } else {
            disconnectWallet()
        }
    }

    return (
        <li onClick={connectOrDisconnectWallet}>
            <a className="waves-effect waves-light btn-large">
                {wallet === "" && "Connect Wallet"}
                {wallet !== "" && wallet}
            </a>
        </li>
    );
}

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header>
                            <WalletButton />
                        </Header>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default connect(null, actions)(App);
