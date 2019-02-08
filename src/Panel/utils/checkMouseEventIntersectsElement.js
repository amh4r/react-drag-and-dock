const checkMouseEventIntersectsElement = (mouseEvent, element) => {
  const { clientX, clientY } = mouseEvent;
  const { bottom, left, right, top } = element.getBoundingClientRect();
  const isMouseInsideX = clientX > left && clientX < right;
  const isMouseInsideY = clientY > top && clientY < bottom;

  return isMouseInsideX && isMouseInsideY;
};

export default checkMouseEventIntersectsElement;
