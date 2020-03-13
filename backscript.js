// tab level: 2
/**
 *generate arr to Recive multipule Port objects
 */
const Ports = [];
const menuPorts = [];

/**
 * @param {a runtime.Port}
 * this function only called onConnect event for runtime.
 * That's why argument is only a port object.
 */
function Connected(port) {
  let data = {};
  data = port.sender;
  if ('tab' in data) {
    Ports.push(data);
  } else {
    menuPorts.push(data);
  }
}

// onConnect event only accept port object.
window.browser.runtime.onConnect.addListener(Connected);

function connectToTab(tabs) {
  if (tabs.length > 0) {
    const examplePort = window.browser.tabs.connect(
      tabs[0].id,
      { name: 'tabs-popup-port' }
    );
    examplePort.postMessage({ greeting: 'Hi from background script' });
  }
}

window.browser.browserAction.onClicked.addListener(() => {
  const gettingActive = window.browser.tabs.query({
    currentyWindow: true, active: true,
  });
  gettingActive.then(connectToTab, onError);
});
