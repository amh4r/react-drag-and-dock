const movePanelToTopOfStack = ({ panels, panelUid }) => {
  const newPanels = new Map(panels);
  const panel = panels.get(panelUid);

  newPanels.delete(panelUid);
  newPanels.set(panelUid, panel);

  return { newPanels };
};

export default movePanelToTopOfStack;
