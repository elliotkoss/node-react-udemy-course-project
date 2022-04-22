import { shortenAddress, useEthers, useLookupAddress } from "@usedapp/core";
import React, { Component, useEffect, useState, useReducer } from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

function WalletButton() {
    const [wallet, setWallet] = useState("");
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    const ens = useLookupAddress();
    const { account, activateBrowserWallet, deactivate, error } = useEthers();

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

    return (
        <li onClick={() => {
            if (!wallet) {
                activateBrowserWallet();
            } else {
                setWallet("");
                forceUpdate();
                deactivate();
            }
        }}>
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
