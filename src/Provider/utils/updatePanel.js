const updatePanel = ({ newData, panels, panelUid }) => {
  const oldPanel = panels.get(panelUid);

  const newPanel = {
    ...oldPanel,
    ...newData,
  };

  const newPanels = new Map(panels).set(panelUid, newPanel);

  return newPanels;
};

export default updatePanel;
