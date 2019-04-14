import changeDockActivePanel from './changeDockActivePanel';
import handleDockPanelDimensions from './handleDockPanelDimensions';
import updateDock from './updateDock';
import validate from './validate';
import updatePanel from './updatePanel';

const validateArgs = ({ docks, panels, panelUid }) => {
  validate.docks(docks);
  validate.panels(panels);
  validate.panelUid(panelUid);
};

const removePanelFromDocks = ({ docks, panels, panelUid }) => {
  validateArgs({ docks, panels, panelUid });

  let newDocks = new Map(docks);
  let newPanels = new Map(panels);

  newPanels = updatePanel({
    newData: { snappedDockUid: null },
    panels: newPanels,
    panelUid,
  });

  docks.forEach((dock, dockUid) => {
    const isPanelInDock = dock.panels.has(panelUid);

    if (!isPanelInDock) return;

    const newDockPanels = new Map(dock.panels);

    newDockPanels.delete(panelUid);

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

    const newActivePanelUid = (() => {
      if (newDockPanels.size === 0) return null;

      const firstDockPanelUid = newDockPanels.keys().next().value;

      return firstDockPanelUid;
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
