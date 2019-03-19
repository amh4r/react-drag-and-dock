import validate from './validate';

const validateArguments = ({ panels, panelUid }) => {
  validate.panels(panels);
  validate.panelUid(panelUid);
};

const unregisterPanel = ({ panels, panelUid }) => {
  validateArguments({ panels, panelUid });

  if (!panels.has(panelUid)) {
    throw new Error(`No panel registered with uid "${panelUid}"`);
  }

  const newPanels = new Map(panels)
  
  newPanels.delete(panelUid);

  return newPanels;
};

export default unregisterPanel;
