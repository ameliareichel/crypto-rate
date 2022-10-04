import React from "react";
import './Header.css';

const Header = () => {

    return(
        <div className="header">
            <img src="bitcoin.png" alt="bitcoin logo" className="bitcoin-logo" />
            <h1>Crypto Rate</h1>
            <img src="yellowChevron.png" alt="yellow dash" className="yellow-dash"/>
        </div>
    );
}

export default Header;