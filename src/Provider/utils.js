const addPanelToDock = ({ docks, dockRef, panels, panelRef }) => {
  const dock = docks.get(dockRef);
  const panel = panels.get(panelRef);

  const newDock = {
    ...dock,
    panels: new Map(dock.panels).set(panelRef, panel),
  };

  const newDocks = new Map([...docks]).set(dockRef, newDock);

  return newDocks;
};

const removePanelFromDocks = ({ docks, panelRef }) => {
  const newDocks = new Map(docks);

  new Map(docks).forEach((dock, key) => {
    const { panels } = dock;

    if (panels.has(panelRef)) {
      const newPanels = new Map(panels);

      newPanels.delete(panelRef);

      const newDock = {
        ...dock,
        panels: newPanels,
      };

      newDocks.set(key, newDock);
    }
  });

  return newDocks;
};

const snapPanelToDock = ({ docks, dockRef, panels, panelRef }) => {
  const panel = panels.get(panelRef);

  const newPanel = {
    ...panel,
    snappedDock: dockRef || null,
  };

  const newPanels = new Map([...panels]).set(panelRef, newPanel);

  let newDocks = removePanelFromDocks({ docks, panelRef });

  if (dockRef) {
    newDocks = addPanelToDock({
      docks: newDocks,
      dockRef,
      panels: newPanels,
      panelRef,
    });
  }

  return {
    newDocks,
    newPanels,
  };
};

const upsertDock = ({ dockProps, dockRef, docks }) => {
  const oldDock = docks.get(dockRef);

  const newDock = {
    panels: new Map(),
    ...oldDock,
    props: dockProps,
    ref: dockRef,
  };

  const newDocks = new Map([...docks]).set(dockRef, newDock);

  return newDocks;
};

const upsertPanel = ({ panelProps, panelRef, panels }) => {
  const oldPanel = panels.get(panelRef);

  const newPanel = {
    ...oldPanel,
    props: panelProps,
    ref: panelRef,
  };

  const newPanels = new Map([...panels]).set(panelRef, newPanel);

  return newPanels;
};

export { addPanelToDock, removePanelFromDocks, snapPanelToDock, upsertDock, upsertPanel };
