// tab level:2
/**
 * may be this module only recived message from background script.
 * now position, which not send the message to background script.
 */

const BASE_URL = 'http://docs.python.org';
const JA_URL = new URL('/ja/3/', BASE_URL);
const EN_URL = new URL('/3/', BASE_URL);
const STADARD_LIB_URL = 'library';
const INDEX_URL = 'py-modindex.html';

// runtime.Port object
let MyPort;

// create connection between background script and this script
// runtime.connect({name}) name will be passed into runtime.Onconnect
function CreateConnection() {
  const portname = { name: 'search-to-backgraound' };
  MyPort = window.browser.runtime.connect(portname);
  console.log('create connection on contentsc');
}

window.addEventListener('load', CreateConnection, false);

// this function will fire everty time when push a web action.
MyPort.onMessage.addListener((message) => {
  console.log('In content script, recived message from background script:');
  console.log(message.greeting);
});
