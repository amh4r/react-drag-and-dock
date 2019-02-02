const getPanelDimensions = (initialPosition, dockRef, panelTabsOffset) => {
  const {
    height: dockHeight,
    width: dockWidth,
    x: dockX,
    y: dockY,
  } = dockRef.current.getBoundingClientRect();

  return {
    height: dockHeight - panelTabsOffset,
    width: dockWidth,
    x: dockX - initialPosition.x + window.scrollX,
    y: dockY - initialPosition.y + window.scrollY + panelTabsOffset,
  };
};

export default getPanelDimensions;
