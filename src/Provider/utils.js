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
  const newDockPanels = new Map(dock.panels).set(panelRef, panel);

  const newDockData = {
    panels: newDockPanels,
    arePanelTabsVisible: newDockPanels.size > 1,
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

const removePanelFromDocks = ({ docks, panelRef, panels }) => {
  let newDocks = new Map(docks);
  let newPanels = new Map(panels);

  new Map(docks).forEach((dock) => {
    const isPanelInDock = dock.panels.has(panelRef);

    if (!isPanelInDock) return;

    const newDockPanels = new Map(dock.panels);

    newDockPanels.delete(panelRef);

    const newDockData = {
      panels: newDockPanels,
      arePanelTabsVisible: newDockPanels.size > 1,
    };

    newDocks = updateDock({
      newData: newDockData,
      ref: dock.ref,
      docks: newDocks,
    });

    const newActivePanelRef = (() => {
      if (newDockPanels.size === 0) return null;

      const firstDockPanel = newDockPanels.values().next().value;

      return firstDockPanel.ref;
    })();

    ({ newDocks, newPanels } = changeDockActivePanel({
      dockRef: dock.ref,
      docks: newDocks,
      activePanelRef: newActivePanelRef,
      panels: newPanels,
    }));
  });

  return {
    newDocks,
    newPanels,
  };
};

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

  let newDocks = new Map(docks);
  let newPanels = new Map(panels).set(panelRef, newPanel);

  ({ newDocks, newPanels } = removePanelFromDocks({
    docks: newDocks,
    panelRef,
    panels: newPanels,
  }));

  if (dockRef) {
    ({ newDocks, newPanels } = addPanelToDock({
      docks: newDocks,
      dockRef,
      panels: newPanels,
      panelRef,
    }));

    const newDockData = {
      activePanelRef: panelRef,
    };

    newDocks = updateDock({
      newData: newDockData,
      ref: dockRef,
      docks: newDocks,
    });
  }

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
  snapPanelToDock,
  updateDock,
  updatePanel,
};
