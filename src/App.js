import logo from './logo.svg';
import './App.css';

function toggleTheme() {
  const body = document.querySelector('.App-header');
  body.classList.toggle('dark');  // toggle dark class
  window.parent.postMessage({ "data": {"msg": "sportal365_custom_event", "body": ''}}, '*')
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button
            onClick={toggleTheme}
            style={{backgroundColor: "#dc6922", border: "none", padding: "10px", cursor: "pointer", textTransform: "uppercase"}}>
          Toggle Theme
        </button>
      </header>
    </div>
  );
}

export default App;
