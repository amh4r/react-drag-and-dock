const validateArguments = ({ data, docks, dockUid }) => {
  if (!data) {
    throw new Error('data is falsy');
  }

  if (!docks) {
    throw new Error('docks is falsy');
  }

  if (!dockUid) {
    throw new Error('uid is falsy');
  }
};

const registerDock = ({ data, docks, dockUid }) => {
  validateArguments({ data, docks, dockUid });

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
