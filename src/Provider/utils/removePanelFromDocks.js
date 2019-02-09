import changeDockActivePanel from './changeDockActivePanel';
import handleDockPanelDimensions from './handleDockPanelDimensions';
import updateDock from './updateDock';

const removePanelFromDocks = ({ docks, panelRef, panels }) => {
  let newDocks = new Map(docks);
  let newPanels = new Map(panels);

  docks.forEach((dock, dockUid) => {
    const isPanelInDock = dock.panels.has(panelRef);

    if (!isPanelInDock) return;

    const newDockPanels = new Map(dock.panels);

    newDockPanels.delete(panelRef);

    const newDockData = {
      panels: newDockPanels,
      arePanelTabsVisible: newDockPanels.size > 1,
    };

    newDocks = updateDock({
      docks: newDocks,
      dockUid,
      newData: newDockData,
    });

    ({ newDocks, newPanels } = handleDockPanelDimensions({
      docks: newDocks,
      dockUid,
      panels: newPanels,
    }));

    /* TODO */
    const newActivePanelUid = (() => {
      if (newDockPanels.size === 0) return null;

      const firstDockPanel = newDockPanels.values().next().value;

      return firstDockPanel.ref;
    })();

    ({ newDocks, newPanels } = changeDockActivePanel({
      activePanelUid: newActivePanelUid,
      docks: newDocks,
      dockUid,
      panels: newPanels,
    }));
  });

  return {
    newDocks,
    newPanels,
  };
};

export default removePanelFromDocks;
