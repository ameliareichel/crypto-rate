import React, { Component } from "react";
import './Crypto.css';
import CryptoList from "./CryptoList";
import axios from 'axios';

class Crypto extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cryptoList: []
        };
    }

    componentDidMount() {
        this.getData();
    }

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
                            //code
                        }
                        else {
                            newCrypto.cssClass = 'blue';
                            newCrypto.htmlArrow = String.fromCharCode(8596);
                        };

                        console.log(newCrypto);

                        newList.push(newCrypto);
                    };
                    return ({
                        cryptoList: newList
                    });
                });
            })
    };

    render() {

        return (
            <div className="app-body">
                <input type="text" placeholder="Filter currency..." className="filter" />
                <div className="crypto-list">
                    <CryptoList cryptoList={this.state.cryptoList} />
                </div>
            </div>
        );
    };
}

export default Crypto;