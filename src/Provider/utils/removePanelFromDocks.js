import changeDockActivePanel from './changeDockActivePanel';
import updateDock from './updateDock';

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

export default removePanelFromDocks;
