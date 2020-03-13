// tab level:2

// initialize
const portname = { name: 'popup-to-background' };
const myPort = window.browser.runtime.connect(portname);

let SearchForm;
let SearchInput;
let JumpOption;

/**
 * create new JSON object to send background script.
 * which default format is {greeting: message}
 * @param {} string
 */
function ConvertValues(value) {
  let messObj;
  const tempArr = { str: `{"greeting":"${value}"}`, other: `{"greeting":${value}}` };
  if (typeof (value) === 'string') {
    messObj = tempArr.str;
  } else {
    messObj = tempArr.other;
  } try {
    const messJSONobj = JSON.parse(messObj);
    return messJSONobj;
  } catch (e) {
    console.error(e);
  }
}

function GetValue(e) {
  let message;
  const cpvalue = e.target.value;
  message = ConvertValues(cpvalue);
  return message;
}

SearchInput = document.querySelector('#search-box');
SearchInput.addEventListener('input', GetValue);

/**
 * recived parameters send background script
 * this function only accept JSON obj
 *  which is converted mesage to send to backsc
 * @param {JSON} messages
 */
function SendmessBacksc(mess) {
  myPort.postMessage(mess);
}

// we should think about this block well.
SearchForm = document.querySelector('#submit-form');
SearchForm.addEventListener('submit', SendmessBacksc, false);

// insert dom to popup page
function InsertAnchour(e) {
  const parent = document.querySelector('#result-box');
  const str = e;
  console.log(str);
  const a = document.createElement('a');
  parent.appendChild(a);
}

// fire this code when the port obj recived message from backsc.
myPort.onMessage.addListener(InsertAnchour);

function JumpOptionPage() {
  window.browser.runtime.openOptionsPage();
}

JumpOption = document.querySelector('#jump-option');
JumpOption.addEventListener('click', JumpOptionPage);
