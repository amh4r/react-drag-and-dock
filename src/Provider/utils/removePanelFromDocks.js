import changeDockActivePanel from './changeDockActivePanel';
import handleDockPanelDimensions from './handleDockPanelDimensions';
import updateDock from './updateDock';

const removePanelFromDocks = ({ docks, panelRef, panels }) => {
  let newDocks = new Map(docks);
  let newPanels = new Map(panels);

  docks.forEach((dock) => {
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

    ({ newDocks, newPanels } = handleDockPanelDimensions({
      docks: newDocks,
      dockRef: dock.ref,
      panels: newPanels,
    }));

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
