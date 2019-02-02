const registerPanel = ({ data, ref, panels }) => {
  const { height, width, x, y } = ref.current.getBoundingClientRect();

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
    snappedDock: null,
  };

  const newPanel = {
    ...defaults,
    ...data,
    ref,
  };

  const newPanels = new Map(panels).set(ref, newPanel);

  return newPanels;
};

export default registerPanel;
