// tab level:2

const portname = { name: 'popup-to-background' };
const backscPort = browser.runtime.connect(portname);

/*
 * form element.
 * this is named target.
*/
const target = document.querySelector('#submit-form');
const input = document.querySelector('#search-box');

/**
 * create new JSON object to send background script.
 * which default format is {greeting: message}
 * @param {} string
 */
function ConvertValues(value) {
  let messObj = {};
  const tempArr = { str: `{"greeting":"${value}"}`, other: `{"greeting":${value}}` };
  if (typeof (value) === 'string') {
    messObj = tempArr.str;
  } else {
    messObj = tempArr.other;
  }
  const messJSONobj = JSON.parse(messObj);
  return messJSONobj;
}

/**
 * recived parameters send background script
 * @param {JSON object} message
 */
function SendmessBacksc(message) {
  backscPort.postMessage(message);
}

target.addEventListener('submit', (e) => {
  // event target string
  SendmessBacksc();
});

// insert dom to popup page
function InsertAnchour() {
  const parent = document.querySelector('#result-box');
  const a = document.createElement('a');
  parent.appendChild(a);
}

// will send a stand by message to background script when popup html and js are loaded
window.addEventListener('load', (e) => {
  console.log('compleate load elements.');
});
