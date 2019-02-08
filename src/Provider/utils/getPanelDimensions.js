const getPanelDimensions = ({ dock }) => {
  const { arePanelTabsVisible, panelTabsHeight } = dock;
  const panelTabsOffset = arePanelTabsVisible ? panelTabsHeight : 0;
  const dockRect = dock.ref.current.getBoundingClientRect();

  return {
    height: dockRect.height - panelTabsOffset,
    width: dockRect.width,
    x: dockRect.x + window.scrollX,
    y: dockRect.y + panelTabsOffset + window.scrollY,
  };
};

export default getPanelDimensions;
