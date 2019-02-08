import changeDockActivePanel from './changeDockActivePanel';
import updateDock from './updateDock';

const addPanelToDock = ({ docks, dockRef, panels, panelRef }) => {
  const dock = docks.get(dockRef);
  const panel = panels.get(panelRef);
  const newDockPanels = new Map(dock.panels).set(panelRef, panel);

  const newDockData = {
    panels: newDockPanels,
    arePanelTabsVisible: newDockPanels.size > 1,
  };

  let newDocks = updateDock({
    newData: newDockData,
    ref: dockRef,
    docks,
  });

  let newPanels = null;

  ({ newDocks, newPanels } = changeDockActivePanel({
    dockRef,
    docks: newDocks,
    activePanelRef: panelRef,
    panels,
  }));

  return {
    newDocks,
    newPanels,
  };
};

export default addPanelToDock;
