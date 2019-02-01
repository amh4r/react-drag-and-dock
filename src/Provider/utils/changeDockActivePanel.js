import updateDock from './updateDock';
import updatePanel from './updatePanel';

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

export default changeDockActivePanel;
