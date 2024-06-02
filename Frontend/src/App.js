import React from 'react';
import Headlines from './components/Headlines';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>News Today</h1>
      </header>
      <main>
        <Headlines />
      </main>
      <footer>
        <p>&copy; 2024 News Today. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
