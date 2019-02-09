const registerPanel = ({ data, panels, panelUid }) => {
  const { height, width, x, y } = (() => {
    if (!data.ref.current) {
      return {};
    }

    return data.ref.current.getBoundingClientRect();
  })();

  const dimensions = {
    height,
    width,
    x: x + window.scrollX,
    y: y + window.scrollY,
  };

  const defaults = {
    dimensions,
    initialDimensions: {
      ...dimensions,
    },
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
