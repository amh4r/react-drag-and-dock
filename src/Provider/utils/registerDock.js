const validateArguments = ({ data, docks, uid }) => {
  if (!data) {
    throw new Error('data is falsy');
  }

  if (!docks) {
    throw new Error('docks is falsy');
  }

  if (!uid) {
    throw new Error('uid is falsy');
  }
};

const registerDock = ({ data, docks, uid }) => {
  validateArguments({ data, docks, uid });

  const defaults = {
    panels: new Map(),
  };

  const newDock = {
    ...defaults,
    ...data,
    arePanelTabsVisible: false,
    panelTabsHeight: 20,
  };

  const newDocks = new Map(docks).set(uid, newDock);

  return {
    newDocks,
    uid,
  };
};

export default registerDock;
