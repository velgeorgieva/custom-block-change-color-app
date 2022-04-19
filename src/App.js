import logo from './logo.svg';
import './App.css';

function toggleTheme() {
  const body = document.querySelector('.App-header');
  body.classList.toggle('dark');  // toggle dark class
  const jsonResponse = {"name":"John", "age":30, "car":null};
  console.log(JSON.stringify(jsonResponse));
  window.parent.postMessage({ "data": {"msg": "sportal365_custom_event", "payload": JSON.stringify(jsonResponse)}}, '*');
}
//Callback function
function receiveMessageFromIframePage (event) {
  if(event.data.origin === 'http://localhost:3000/') {
    console.log('receiveMessageFromCMS', event);
    const body = document.querySelector('.cms-response');
    body.appendChild(document.createTextNode(event.data));
  }

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
