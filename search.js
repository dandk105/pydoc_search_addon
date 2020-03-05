// tab level:2


const BASE_URL = 'http://docs.python.org';
const JA_URL = new URL('/ja/3/', BASE_URL);
const EN_URL = new URL('/3/', BASE_URL);
const STADARD_LIB_URL = 'library';
const INDEX_URL = 'py-modindex.html';

// create connection between background script and this script
// runtime.connect({name}) name will be passed into runtime.Onconnect
const portname = { name: 'search-to-backgraound' };
const myPort = browser.runtime.connect(portname);

// this function will fire everty time when push a web action.
myPort.onMessage.addListener((message) => {
  console.log('In content script, recived message from background script:');
  console.log(message.greeting);
});

// send words to background script recived from input element
function SendMessage(message) {
  const MessageRow = '';
  if (message.length > 0) {
    MessageRow === message;
  }
  browser.runtime.connect();
}

// send end message to background script
function EndInput() {
  myPort.postMessage({ greeting: 'BK255' });
}
