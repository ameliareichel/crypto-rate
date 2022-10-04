import React from "react";
import './CryptoList.css';

const CryptoList = (props) => {

    let cryptoList = props.cryptoList;

    let listElements = cryptoList.map((cryptoElementObj) => {

        return (
            <p className="crypto-item" key={cryptoElementObj.currency}>Last rate:
                <span className={`CryptoRate ${cryptoElementObj.cssClass}`}>{cryptoElementObj.last} {cryptoElementObj.htmlArrow}</span>
                <span className="item-currency-name">{cryptoElementObj.currency}</span>
                <span className="item-currency-symbol"> [{cryptoElementObj.symbol}]</span>
            </p>
        );
    });

    return (
        <div className="cryptoList-container">
            {listElements}
        </div>
    );
};

export default CryptoList;