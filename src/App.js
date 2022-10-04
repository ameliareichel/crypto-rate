import React from 'react';
import './App.css';
import Header from './Header';
import Crypto from './Crypto';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <Crypto />
    </div>
  );
}

export default App;