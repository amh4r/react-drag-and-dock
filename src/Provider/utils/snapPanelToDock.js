import addPanelToDock from './addPanelToDock';
import getPanelDimensions from './getPanelDimensions';
import removePanelFromDocks from './removePanelFromDocks';
import updateDock from './updateDock';
import updatePanel from './updatePanel';

const snapPanelToDock = ({ docks, dockRef, panels, panelRef }) => {
  let newDocks = new Map(docks);
  let newPanels = new Map(panels);

  ({ newDocks, newPanels } = removePanelFromDocks({
    docks: newDocks,
    panelRef,
    panels: newPanels,
  }));

  if (dockRef) {
    ({ newDocks, newPanels } = addPanelToDock({
      docks: newDocks,
      dockRef,
      panels: newPanels,
      panelRef,
    }));

    const newDockData = {
      activePanelRef: panelRef,
    };

    newDocks = updateDock({
      newData: newDockData,
      ref: dockRef,
      docks: newDocks,
    });
  }

  const dock = newDocks.get(dockRef) || null;
  const panel = newPanels.get(panelRef);
  const newPanelDimensions = dock ? getPanelDimensions(panel.initialDimensions, dock) : {};

  const newPanelData = {
    dimensions: {
      ...panel.dimensions,
      ...newPanelDimensions,
    },
    snappedDock: dock ? dock.ref : null,
  };

  newPanels = updatePanel({
    newData: newPanelData,
    ref: panelRef,
    panels: newPanels,
  });

  return {
    newDocks,
    newPanels,
  };
};

export default snapPanelToDock;
