import logo from './logo.svg';
import './App.css';

function toggleTheme() {
  const element = document.querySelector('.App-header');
  element.classList.toggle('dark');  // toggle dark class
  //Send message to the CMS
  const jsonResponse = element.className.includes('dark') ? {"className":"dark"} : {"className":""};
  window.parent.postMessage({"msg": "sportal365_custom_event", "payload": JSON.stringify(jsonResponse)}, '*');
}

//Callback function
function receiveMessageFromIframePage (event) {
    console.log('receiveMessageFromCMS', event);

    const body = document.querySelector('.cms-response');
    const withChildNodes = body.childNodes[0] ? body.childNodes[0].nodeValue.length : null;

    if(withChildNodes) {
      body.childNodes[0].remove();
    }
    if( event && event.data && event.data.msg ) {
        body.appendChild(document.createTextNode('Message dispatched from the CMS: ' + event.data.msg));
    }

    //on load of iframe page, send message to parent page
    if(event.data.msg === 'sportal365_custom_event_onload') {
      const element = document.querySelector('.App-header');
      element.classList.toggle(JSON.parse(event.data.payload).className ? JSON.parse(event.data.payload).className : 'empty');  // toggle dark class
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
            style={{backgroundColor: "#dc6922", border: "none", padding: "10px", cursor: "pointer", textTransform: "uppercase",color: "#fff",
              fontWeight: "bold" }}>
          change background color
        </button>
      </header>
    </div>
  );
}

export default App;
