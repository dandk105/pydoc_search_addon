
/**
 *generate arr to Recive multipule Port objects
 */
let Ports = [];
let menuPorts = [];

/**
 * @param {a runtime.Port object }
 * recived parameters add Ports arry.
 */
function Connected(port) {
  let { data } = {};
  // couldnt all copy of port object.
  data = port.sender;
  if ('tab' in data) {
    Ports[port.sender.tab.id] = port;
  } else {
    menuPorts[port.sender.id] = port;
  }
}

browser.runtime.onConnect.addListener(Connected);

// send message to contents script
function ConectedPopups(popup) {
  let port = browser.tabs.connect();
}
