const updatePanel = ({ newData, ref, panels }) => {
  const oldPanel = panels.get(ref);

  const newPanel = {
    ...oldPanel,
    ...newData,
    ref,
  };

  const newPanels = new Map(panels).set(ref, newPanel);

  return newPanels;
};

export default updatePanel;
