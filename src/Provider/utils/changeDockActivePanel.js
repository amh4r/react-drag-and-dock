import updateDock from './updateDock';
import updatePanel from './updatePanel';

const changeDockActivePanel = ({ docks, dockUid, activePanelRef, panels }) => {
  const newDockData = {
    activePanelRef,
  };

  const newDocks = updateDock({
    docks,
    newData: newDockData,
    uid: dockUid,
  });

  const dock = docks.get(dockUid);
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
