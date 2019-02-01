const registerPanel = ({ data, ref, panels }) => {
  const defaults = {
    isVisible: true,
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
