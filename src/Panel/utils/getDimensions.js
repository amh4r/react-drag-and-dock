const getDimensions = (dockRef) => {
  const {
    height: dockHeight,
    width: dockWidth,
    x: dockX,
  } = dockRef.current.getBoundingClientRect();

  const bodyStyle = window.getComputedStyle(document.body);
  const marginLeft = Number.parseInt(bodyStyle.marginLeft, 10);

  return {
    height: dockHeight,
    width: dockWidth,
    x: dockX - marginLeft + window.scrollX,
    y: -1 * dockHeight,
  };
};

export default getDimensions;
