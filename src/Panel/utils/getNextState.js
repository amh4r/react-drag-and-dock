import getPanelDimensions from './getPanelDimensions';

const getNextState = (props, prevState) => {
  const { ref } = prevState;

  if (!ref.current) return null;

  const { context } = props;
  const panel = context.provider.panels.get(ref);
  const snappedDockRef = panel.snappedDock;

  if (!snappedDockRef) {
    return {
      position: null,
    };
  }

  const { initialPosition } = prevState;
  const dock = context.provider.docks.get(snappedDockRef);
  const { arePanelTabsVisible, panelTabsHeight } = dock;
  const panelTabsOffset = arePanelTabsVisible ? panelTabsHeight : 0;

  const { height, width, x, y } = getPanelDimensions(
    initialPosition,
    snappedDockRef,
    panelTabsOffset,
  );

  return {
    height,
    width,
    isVisible: panel.isVisible,
    position: {
      x,
      y,
    },
  };
};

export default getNextState;
