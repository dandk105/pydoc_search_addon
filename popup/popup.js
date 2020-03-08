// tab level:2

const portname = { name: 'popup-to-background' };
const backscPort = window.browser.runtime.connect(portname);

/*
 * form element.
 * this is named target.
*/
const target = document.querySelector('#submit-form');
const input = document.querySelector('#search-box');
const dumybtn = document.querySelector('#submit-button');
const a_option = document.querySelector('#jump-option');

/**
 * create new JSON object to send background script.
 * which default format is {greeting: message}
 * @param {} string
 */
function ConvertValues(value) {
  let messObj = '';
  let tempArr = { str: `{"greeting":"${value}"}`, other: `{"greeting":${value}}` };
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
function SendmessBacksc(message, time) {
  backscPort.postMessage(message);
}

// we should think this block well.
target.addEventListener('submit', SendmessBacksc);

function SendinputsValue(e) {
  const strings = e.targt.value;
  const mess = ConvertValues(strings);
  SendmessBacksc(mess);
}

input.addEventListener('keypress', SendinputsValue);

dumybtn.addEventListener('click', (e) => {
  e.preventDefault();
}, true);

// insert dom to popup page
function InsertAnchour() {
  const parent = document.querySelector('#result-box');
  const a = document.createElement('a');
  parent.appendChild(a);
}

function JumpOption() {
  window.browser.runtime.openOptionsPage();
}
a_option.addEventListener('click', JumpOption);
