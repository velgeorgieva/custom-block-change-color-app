import logo from './logo.svg';
import './App.css';

function toggleTheme() {
  const body = document.querySelector('.App-header');
  body.classList.toggle('dark');  // toggle dark class
  window.parent.postMessage({ "data": {"msg": "sportal365_custom_event", "payload": ''}}, '*')
}
//Callback function
function receiveMessageFromIframePage (event) {
  console.log('receiveMessageFromIframePage', event);
  const body = document.querySelector('.cms-response');
  const element = document.querySelector('.cms-response-text');
  element && element.remove();
  body.createElement('div', {class: 'cms-response-text'}).insertAdjacentText('beforeend', event.data);
}

//Listen for message events
window.addEventListener("message", receiveMessageFromIframePage, false);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='cms-response'></div>
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
