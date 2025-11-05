import logo from './logo.svg';
import './App.css';
import Hi from './event.js';  
import Salute from './class.js';

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
      <div className='app3'>
        <Hi />
      </div>
       <div className='app4'>
        <Salute />
      </div>
    </div>
  );
}

export default App;
