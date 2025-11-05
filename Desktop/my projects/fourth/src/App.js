import logo from './logo.svg';
import './App.css';
 import KeyEventer from './thu.js';
 import Colour from './chanje.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <KeyEventer />
      </div>
      <div>
        <Colour />    
      </div>
    </div>
  );
}

export default App;
