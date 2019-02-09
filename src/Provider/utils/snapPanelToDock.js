import addPanelToDock from './addPanelToDock';
import getPanelDimensions from './getPanelDimensions';
import handleDockPanelDimensions from './handleDockPanelDimensions';
import removePanelFromDocks from './removePanelFromDocks';
import updateDock from './updateDock';
import updatePanel from './updatePanel';

const snapPanelToDock = ({ docks, dockUid, panels, panelUid }) => {
  let newDocks = new Map(docks);
  let newPanels = new Map(panels);

  ({ newDocks, newPanels } = removePanelFromDocks({
    docks: newDocks,
    panels: newPanels,
    panelUid,
  }));

  if (dockUid) {
    ({ newDocks, newPanels } = addPanelToDock({
      docks: newDocks,
      dockUid,
      panels: newPanels,
      panelUid,
    }));

    const newDockData = {
      activePanelUid: panelUid,
    };

    newDocks = updateDock({
      docks: newDocks,
      dockUid,
      newData: newDockData,
    });
  }

  const dock = newDocks.get(dockUid) || null;
  const panel = newPanels.get(panelUid);

  const newPanelDimensions = (() => {
    if (!dock) {
      return {};
    }

    return getPanelDimensions({ dock });
  })();

  const newPanelData = {
    ...panel,
    dimensions: {
      ...panel.dimensions,
      ...newPanelDimensions,
    },
    snappedDockUid: dockUid || null,
  };

  newPanels = updatePanel({
    newData: newPanelData,
    panels: newPanels,
    panelUid,
  });

  if (dock) {
    ({ newDocks, newPanels } = handleDockPanelDimensions({
      docks: newDocks,
      dockUid,
      panels: newPanels,
    }));
  }

  return {
    newDocks,
    newPanels,
  };
};

export default snapPanelToDock;
