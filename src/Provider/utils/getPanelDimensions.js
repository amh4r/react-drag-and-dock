const getPanelDimensions = ({ dock, dockSection, panelTabsVisible }) => {
  const {
    arePanelTabsVisible,
    panelTabsHeight,
    props: { tabLocation },
  } = dock;
  const panelTabsOffset = arePanelTabsVisible || panelTabsVisible ? panelTabsHeight : 0;
  const dockRect = dock.ref.current.getBoundingClientRect();

  const height = dockRect.height - panelTabsOffset;
  const width = dockRect.width - 2;
  const x = dockRect.x + window.scrollX;
  const y = dockRect.y + window.scrollY + (tabLocation === 'bottom' ? 0 : panelTabsOffset);

  if (dockSection === 'top') {
    return {
      height: dockRect.height / 2,
      width,
      x,
      y,
    };
  }
  if (dockSection === 'bottom') {
    return {
      height: dockRect.height / 2,
      width,
      x,
      y: dockRect.y + dockRect.height / 2 + window.scrollY,
    };
  }

  return {
    height,
    width,
    x,
    y,
  };
};

export default getPanelDimensions;
