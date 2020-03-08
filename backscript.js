
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

window.browser.runtime.onConnect.addListener(Connected);

function connectToTab(tabs) {
  if (tabs.length > 0) {
    const examplePort = window.browser.tabs.connect(
      tabs[0].id,
      { name: 'tabs-popup-port' }
    );
    examplePort.postMessage({ greeting: 'Hi from background script' })
  }
}

window.browser.browserAction.onClicked.addListener((e) => {
  const gettingActive = window.browser.tabs.query({
    currentyWindow: true, active: true
  });
  gettingActive.then(connectToTab, onError);
});
