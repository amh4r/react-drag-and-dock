const registerDock = ({ data, ref, docks }) => {
  const defaults = {
    panels: new Map(),
  };

  const newDock = {
    ...defaults,
    ...data,
    arePanelTabsVisible: false,
    panelTabsHeight: 20,
    ref,
  };

  const newDocks = new Map(docks).set(ref, newDock);

  return newDocks;
};

export default registerDock;
