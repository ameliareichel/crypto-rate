import React, { Component } from "react";
import './Crypto.css';
import CryptoList from "./CryptoList";
import axios from 'axios';

class Crypto extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cryptoList: [],
            filterCryptoList: []
        };
    };

    componentDidMount() {
        this.getData();
        this.timerId = setInterval(() => this.getData(), 5000);
    };

    componentWillUnmount() {
        clearInterval(this.timerId);
    };

    getData = () => {

        axios.get('https://blockchain.info/ticker', { mode: 'cors' })
            .then(res => {
                const tickers = res.data;

                this.setState((state) => {
                    let newList = [];

                    for (let [ticker, cryptoRate] of Object.entries(tickers)) {

                        let lastCryptoObj = state.cryptoList.find((cryptoObj) => {
                            return (cryptoObj.currency === ticker);
                        });

                        let newCrypto = {
                            currency: ticker,
                            symbol: cryptoRate.symbol,
                            buy: cryptoRate.buy,
                            last: cryptoRate.last,
                            sell: cryptoRate.sell
                        };

                        if (lastCryptoObj !== undefined) {
                            if (newCrypto.last > lastCryptoObj.last) {
                                newCrypto.cssClass = 'green';
                                newCrypto.htmlArrow = String.fromCharCode(8593);
                            }
                            else if (newCrypto.last < lastCryptoObj.last) {
                                newCrypto.cssClass = 'red';
                                newCrypto.htmlArrow = String.fromCharCode(8595);
                            }
                            else {
                                newCrypto.cssClass = 'blue';
                                newCrypto.htmlArrow = String.fromCharCode(8596);
                            }
                        }
                        else {
                            newCrypto.cssClass = 'blue';
                            newCrypto.htmlArrow = String.fromCharCode(8596);
                        };

                        newList.push(newCrypto);
                    };
                    return ({
                        cryptoList: newList
                    });
                });
            })
    };

    cryptoFilter = () => {
        this._inputFilter.value = this._inputFilter.value.trim();

        this.setState((state) => {
            let newFilteredList = state.cryptoList.filter((cryptoObj) => {
                return(cryptoObj.currency.includes(this._inputFilter.value));
            });

            return ({
                filterCryptoList: newFilteredList
            });
        });
    };

    render() {

        return (
            <div className="app-body">
                <input type="text" ref={element => this._inputFilter = element} onChange={this.cryptoFilter} placeholder="Filter currency..." className="filter" />
                <div className="crypto-list">
                    <CryptoList cryptoList={this.state.cryptoList} />
                </div>
            </div>
        );
    };
};

export default Crypto;