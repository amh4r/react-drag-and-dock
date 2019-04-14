import getPanelDimensions from './getPanelDimensions';
import updatePanel from './updatePanel';

const shiftPanelOnDock = ({
  dock,
  dockSection,
  panelTabsVisible,
  panelUid,
  panels,
  preview = false,
}) => {
  let newPanels = new Map(panels);
  const panel = newPanels.get(panelUid) || null;
  if (panel !== null) {
    const newPanelDimensions = getPanelDimensions({ dock, dockSection, panelTabsVisible });
    const newPanelData = {
      ...panel,
      dimensions: {
        ...panel.dimensions,
        ...newPanelDimensions,
      },
      snappedDockUid: dock.uid || null,
    };

    if (!preview) {
      newPanelData.dockSection = dockSection;
    }

    newPanels = updatePanel({
      newData: newPanelData,
      panels: newPanels,
      panelUid,
    });
  }

  return newPanels;
};

export default shiftPanelOnDock;
