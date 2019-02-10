import validate from './validate';

const validateArguments = ({ panels, panelUid }) => {
  validate.panels(panels);
  validate.panelUid(panelUid);
};

/*
 * Make the target panel have the highest zIndex.
 */
const movePanelToTopOfStack = ({ panels, panelUid }) => {
  validateArguments({ panels, panelUid });

  const newPanels = new Map(panels);
  const { zIndex } = panels.get(panelUid);

  panels.forEach((panel, uid) => {
    if (uid === panelUid) {
      newPanels.set(uid, {
        ...panel,
        zIndex: panels.size,
      });
    } else if (panel.zIndex > zIndex) {
      newPanels.set(uid, {
        ...panel,
        zIndex: panel.zIndex - 1,
      });
    }
  });

  return newPanels;
};

export default movePanelToTopOfStack;
