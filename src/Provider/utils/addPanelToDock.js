import changeDockActivePanel from './changeDockActivePanel';
import updateDock from './updateDock';
import validate from './validate';

const validateArgs = ({ docks, dockUid, panels, panelUid }) => {
  validate.docks(docks);
  validate.dockUid(dockUid);
  validate.panels(panels);
  validate.panelUid(panelUid);
};

const validateDock = (dock) => {
  if (!dock) {
    throw new Error(`Dock not found`);
  }
};

const validatePanel = (panel) => {
  if (!panel) {
    throw new Error(`Panel not found`);
  }
};

const addPanelToDock = ({ docks, dockUid, panels, panelUid, panelTabsVisible = true }) => {
  validateArgs({ docks, dockUid, panels, panelUid });

  const dock = docks.get(dockUid);
  const panel = panels.get(panelUid);

  validateDock(dock);
  validatePanel(panel);

  const newDockPanels = new Map(dock.panels).set(panelUid, panel);

  const newDockData = {
    panels: newDockPanels,
    arePanelTabsVisible: panelTabsVisible && newDockPanels.size > 1,
  };

  let newDocks = updateDock({
    docks,
    dockUid,
    newData: newDockData,
  });

  let newPanels = panels;

  if (panelTabsVisible) {
    ({ newDocks, newPanels } = changeDockActivePanel({
      docks: newDocks,
      dockUid,
      activePanelUid: panelUid,
      panels,
    }));
  }

  return {
    newDocks,
    newPanels,
  };
};

export default addPanelToDock;
