const getDimensions = (initialPosition, dockRef) => {
  const {
    height: dockHeight,
    width: dockWidth,
    x: dockX,
    y: dockY,
  } = dockRef.current.getBoundingClientRect();

  return {
    height: dockHeight,
    width: dockWidth,
    x: dockX - initialPosition.x + window.scrollX,
    y: dockY - initialPosition.y + window.scrollY,
  };
};

export default getDimensions;
