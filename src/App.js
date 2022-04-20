import logo from './logo.svg';
import './App.css';

function toggleTheme() {
  const element = document.querySelector('.App-header');
  element.classList.toggle('dark');  // toggle dark class

  const jsonResponse = element.className.includes('dark') ? {"className":"dark"} : {"className":""};
  window.parent.postMessage({ "data": {"msg": "sportal365_custom_event", "payload": JSON.stringify(jsonResponse)}}, '*');
}
//Callback function
function receiveMessageFromIframePage (event) {
  if(event.origin === 'http://localhost:3000') {
    console.log('receiveMessageFromCMS', event);
    const body = document.querySelector('.cms-response');
    body.appendChild(document.createTextNode(event.data));
    if(event.data.data.msg === 'sportal365_custom_event_onload') {
      const element = document.querySelector('.App-header');
      element.classList.toggle(JSON.parse(event.data.data.payload).className);  // toggle dark class
    }
  }

}

//Listen for message events
window.addEventListener("message", receiveMessageFromIframePage, false);

function App() {
  return (
    <div className="App">
      <header id='header' className="App-header">
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
