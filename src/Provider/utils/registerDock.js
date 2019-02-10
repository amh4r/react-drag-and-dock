import validate from './validate';

const validateArguments = ({ data, docks, dockUid }) => {
  validate.dockData(data);
  validate.docks(docks);
  validate.dockUid(dockUid);
};

const registerDock = ({ data, docks, dockUid }) => {
  validateArguments({ data, docks, dockUid });

  if (docks.has(dockUid)) {
    throw new Error(`Panel already registered with uid "${dockUid}"`);
  }

  const defaults = {
    panels: new Map(),
  };

  const newDock = {
    ...defaults,
    ...data,
    arePanelTabsVisible: false,
    panelTabsHeight: 20,
  };

  const newDocks = new Map(docks).set(dockUid, newDock);

  return newDocks;
};

export default registerDock;
