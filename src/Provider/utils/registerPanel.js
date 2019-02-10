import validate from './validate';

const validateArguments = ({ data, panels, panelUid }) => {
  validate.panelData(data);
  validate.panels(panels);
  validate.panelUid(panelUid);
};

const registerPanel = ({ data, panels, panelUid }) => {
  validateArguments({ data, panels, panelUid });

  if (panels.has(panelUid)) {
    throw new Error(`Panel already registered with uid "${panelUid}"`);
  }

  const dimensions = (() => {
    let rect = {};

    if (data.ref && data.ref.current) {
      rect = data.ref.current.getBoundingClientRect();
    }

    return {
      height: rect.height || null,
      width: rect.width || null,
      x: rect.x + window.scrollX || null,
      y: rect.y + window.scrollY || null,
    };
  })();

  const defaults = {
    dimensions,
    isVisible: true,
    snappedDockUid: null,
  };

  const newPanel = {
    ...defaults,
    ...data,
  };

  const newPanels = new Map(panels).set(panelUid, newPanel);

  return newPanels;
};

export default registerPanel;
