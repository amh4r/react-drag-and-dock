import changeDockActivePanel from './changeDockActivePanel';
import updateDock from './updateDock';

const addPanelToDock = ({ docks, dockUid, panels, panelUid }) => {
  const dock = docks.get(dockUid);
  const panel = panels.get(panelUid);
  const newDockPanels = new Map(dock.panels).set(panelUid, panel);

  const newDockData = {
    panels: newDockPanels,
    arePanelTabsVisible: newDockPanels.size > 1,
  };

  let newDocks = updateDock({
    docks,
    dockUid,
    newData: newDockData,
  });

  let newPanels = null;

  ({ newDocks, newPanels } = changeDockActivePanel({
    docks: newDocks,
    dockUid,
    activePanelUid: panelUid,
    panels,
  }));

  return {
    newDocks,
    newPanels,
  };
};

export default addPanelToDock;
