const validateDockData = (val) => {
  if (!val || typeof val !== 'object') {
    throw new TypeError(`dock data must be an object`);
  }
};

const validateDocks = (val) => {
  if (!(val instanceof Map)) {
    throw new TypeError(`docks must be an instance of Map`);
  }
};

const validateDockUid = (val) => {
  if (!val || typeof val !== 'string') {
    throw new TypeError(`dockUid must be a string`);
  }
};

const validatePanelData = (val) => {
  if (!val || typeof val !== 'object') {
    throw new TypeError(`panel data must be an object`);
  }
};

const validatePanels = (val) => {
  if (!(val instanceof Map)) {
    throw new TypeError(`panels must be an instance of Map`);
  }
};

const validatePanelUid = (val) => {
  if (!val || typeof val !== 'string') {
    throw new TypeError(`panelUid must be a string`);
  }
};

export default {
  dockData: validateDockData,
  docks: validateDocks,
  dockUid: validateDockUid,
  panelData: validatePanelData,
  panels: validatePanels,
  panelUid: validatePanelUid,
};
