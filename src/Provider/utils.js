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

  const snappedDock = (() => {
    if (!dockRef) return null;

    const dock = docks.get(dockRef);

    return dock.dockableAreaRef;
  })();

  const newPanel = {
    ...panel,
    snappedDock,
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

const upsertDock = ({ dockableAreaRef, dockProps, dockRef, docks }) => {
  const oldDock = docks.get(dockRef);

  const newDock = {
    panels: new Map(),
    ...oldDock,
    dockableAreaRef,
    props: dockProps,
    ref: dockRef,
  };

  const newDocks = new Map([...docks]).set(dockRef, newDock);

  return newDocks;
};

const upsertPanel = ({ panelProps, panelRef, panels }) => {
  const oldPanel = panels.get(panelRef);

  const newPanel = {
    isVisible: true,
    ...oldPanel,
    props: panelProps,
    ref: panelRef,
  };

  const newPanels = new Map([...panels]).set(panelRef, newPanel);

  return newPanels;
};

export { addPanelToDock, removePanelFromDocks, snapPanelToDock, upsertDock, upsertPanel };
