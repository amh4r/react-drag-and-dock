import addPanelToDock from './addPanelToDock';
import removePanelFromDocks from './removePanelFromDocks';
import updateDock from './updateDock';

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

export default snapPanelToDock;
