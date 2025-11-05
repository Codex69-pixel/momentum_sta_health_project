import logo from './logo.svg';
import './App.css';
import Hello from './tue.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Hello name="World" />
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
      <div className='app2'>
        <Hello name="React" />
      </div>
    </div>
  );
}

export default App;
