import addPanelToDock from './addPanelToDock';
import getPanelDimensions from './getPanelDimensions';
import handleDockPanelDimensions from './handleDockPanelDimensions';
import removePanelFromDocks from './removePanelFromDocks';
import updateDock from './updateDock';
import updatePanel from './updatePanel';

const snapPanelToDock = ({ docks, dockUid, panels, panelRef }) => {
  let newDocks = new Map(docks);
  let newPanels = new Map(panels);

  ({ newDocks, newPanels } = removePanelFromDocks({
    docks: newDocks,
    panelRef,
    panels: newPanels,
  }));

  if (dockUid) {
    ({ newDocks, newPanels } = addPanelToDock({
      docks: newDocks,
      dockUid,
      panels: newPanels,
      panelRef,
    }));

    const newDockData = {
      activePanelRef: panelRef,
    };

    newDocks = updateDock({
      docks: newDocks,
      dockUid,
      newData: newDockData,
    });
  }

  const dock = newDocks.get(dockUid) || null;
  const panel = newPanels.get(panelRef);

  const newPanelDimensions = (() => {
    if (!dock) {
      return {};
    }

    return getPanelDimensions({
      initialDimensions: panel.initialDimensions,
      dock,
      panel,
    });
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
    ref: panelRef,
    panels: newPanels,
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
