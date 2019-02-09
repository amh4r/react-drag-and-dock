import updateDock from './updateDock';
import updatePanel from './updatePanel';

const changeDockActivePanel = ({ activePanelUid, docks, dockUid, panels }) => {
  const newDockData = {
    activePanelUid,
  };

  const newDocks = updateDock({
    docks,
    dockUid,
    newData: newDockData,
  });

  const dock = docks.get(dockUid);
  let newPanels = new Map(panels);

  dock.panels.forEach((panel, panelUid) => {
    const newPanelData = {
      isVisible: panelUid === activePanelUid,
    };

    newPanels = updatePanel({
      newData: newPanelData,
      panels: newPanels,
      panelUid,
    });
  });

  return {
    newDocks,
    newPanels,
  };
};

export default changeDockActivePanel;
