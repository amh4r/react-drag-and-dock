const updateDock = ({ newData, ref, docks }) => {
  const oldData = docks.get(ref);

  const newDock = {
    ...oldData,
    ...newData,
    ref,
  };

  const newDocks = new Map(docks).set(ref, newDock);

  return newDocks;
};

const updatePanel = ({ newData, ref, panels }) => {
  const oldPanel = panels.get(ref);

  const newPanel = {
    ...oldPanel,
    ...newData,
    ref,
  };

  const newPanels = new Map(panels).set(ref, newPanel);

  return newPanels;
};

const changeDockActivePanel = ({ dockRef, docks, activePanelRef, panels }) => {
  const newDockData = {
    activePanelRef,
  };

  const newDocks = updateDock({
    newData: newDockData,
    ref: dockRef,
    docks,
  });

  const dock = docks.get(dockRef);
  let newPanels = new Map(panels);

  dock.panels.forEach((panel) => {
    const newPanelData = {
      isVisible: panel.ref === activePanelRef,
    };

    newPanels = updatePanel({
      newData: newPanelData,
      ref: panel.ref,
      panels: newPanels,
    });
  });

  return {
    newDocks,
    newPanels,
  };
};

const addPanelToDock = ({ docks, dockRef, panels, panelRef }) => {
  const dock = docks.get(dockRef);
  const panel = panels.get(panelRef);

  const newDockData = {
    panels: new Map(dock.panels).set(panelRef, panel),
  };

  let newDocks = updateDock({
    newData: newDockData,
    ref: dockRef,
    docks,
  });

  let newPanels = null;

  ({ newDocks, newPanels } = changeDockActivePanel({
    dockRef,
    docks: newDocks,
    activePanelRef: panelRef,
    panels,
  }));

  return {
    newDocks,
    newPanels,
  };
};

const removePanelFromDocks = ({ docks, panelRef }) => {
  let newDocks = new Map(docks);

  new Map(docks).forEach((dock) => {
    const { panels } = dock;

    if (panels.has(panelRef)) {
      const newPanels = new Map(panels);

      newPanels.delete(panelRef);

      const newDockData = {
        panels: newPanels,
      };

      newDocks = updateDock({
        newData: newDockData,
        ref: dock.ref,
        docks: newDocks,
      });
    }
  });

  return newDocks;
};

const registerDock = ({ data, ref, docks }) => {
  const defaults = {
    panels: new Map(),
  };

  const newDock = {
    ...defaults,
    ...data,
    ref,
  };

  const newDocks = new Map(docks).set(ref, newDock);

  return newDocks;
};

const registerPanel = ({ data, ref, panels }) => {
  const defaults = {
    isVisible: true,
  };

  const newPanel = {
    ...defaults,
    ...data,
    ref,
  };

  const newPanels = new Map(panels).set(ref, newPanel);

  return newPanels;
};

const snapPanelToDock = ({ docks, dockRef, panels, panelRef }) => {
  const panel = panels.get(panelRef);

  const snappedDock = (() => {
    if (!dockRef) return null;

    const dock = docks.get(dockRef);

    return dock.dockableAreaRef;
  })();

  const newPanel = {
    ...panel,
    snappedDock,
  };

  let newPanels = new Map(panels).set(panelRef, newPanel);
  let newDocks = removePanelFromDocks({ docks, panelRef });

  if (dockRef) {
    ({ newDocks, newPanels } = addPanelToDock({
      docks: newDocks,
      dockRef,
      panels: newPanels,
      panelRef,
    }));
  }

  const newDockData = {
    activePanelRef: panelRef,
  };

  newDocks = updateDock({
    newData: newDockData,
    ref: dockRef,
    docks: newDocks,
  });

  console.log(newDocks)

  return {
    newDocks,
    newPanels,
  };
};

export {
  addPanelToDock,
  changeDockActivePanel,
  registerDock,
  registerPanel,
  removePanelFromDocks,
  snapPanelToDock,
  updateDock,
  updatePanel,
};
