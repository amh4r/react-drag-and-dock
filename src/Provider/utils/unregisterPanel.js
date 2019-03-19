import removePanelFromDocks from './removePanelFromDocks';
import validate from './validate';

const validateArguments = ({ docks, panels, panelUid }) => {
  validate.panels(docks);
  validate.panels(panels);
  validate.panelUid(panelUid);
};

const unregisterPanel = ({ docks, panels, panelUid }) => {
  validateArguments({ docks, panels, panelUid });

  if (!panels.has(panelUid)) {
    throw new Error(`No panel registered with uid "${panelUid}"`);
  }

  const { newDocks, newPanels } = removePanelFromDocks({
    docks,
    panels,
    panelUid,
  });

  newPanels.delete(panelUid);

  return {
    newDocks,
    newPanels,
  };
};

export default unregisterPanel;
