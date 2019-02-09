import getPanelDimensions from './getPanelDimensions';
import updatePanel from './updatePanel';

const handleDockPanelDimensions = ({ docks, dockUid, panels }) => {
  const newDocks = new Map(docks);
  let newPanels = new Map(panels);

  panels.forEach((panel, panelUid) => {
    if (panel.snappedDockUid !== dockUid) return;

    const dock = docks.get(panel.snappedDockUid);

    const newPanelDimensions = (() => {
      if (!dock) return {};

      return getPanelDimensions({ dock });
    })();

    const newPanelData = {
      ...panel,
      dimensions: {
        ...panel.dimensions,
        ...newPanelDimensions,
      },
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

export default handleDockPanelDimensions;
