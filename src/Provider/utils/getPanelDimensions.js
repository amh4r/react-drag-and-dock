const getPanelDimensions = (initialPosition, dock) => {
  const { arePanelTabsVisible, panelTabsHeight } = dock;
  const panelTabsOffset = arePanelTabsVisible ? panelTabsHeight : 0;

  const {
    height: dockHeight,
    width: dockWidth,
    x: dockX,
    y: dockY,
  } = dock.ref.current.getBoundingClientRect();

  return {
    height: dockHeight - panelTabsOffset,
    width: dockWidth,
    x: dockX - initialPosition.x + window.scrollX,
    y: dockY - initialPosition.y + window.scrollY + panelTabsOffset,
  };
};

export default getPanelDimensions;
