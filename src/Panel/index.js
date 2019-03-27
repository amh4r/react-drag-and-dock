import React, { useLayoutEffect, useRef, useState } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';

import { checkMouseEventIntersectsElement } from './utils';
import withContext from '../withContext';
import { Handle, Root } from './styles';

function Panel(props) {
  const {
    children,
    context,
    defaultHeight,
    defaultPosition,
    defaultWidth,
    initialDockUid,
    renderTitleBar,
    styles,
    title,
    uid: propsUid,
  } = props;

  const ref = useRef(null);
  const uidRef = useRef(propsUid);
  const [draggedOverDock, setDraggedOverDock] = useState(null);
  let uid = uidRef.current;

  const snapToInitialDock = () => {
    if (initialDockUid) {
      const { snapPanelToDock } = context;

      snapPanelToDock(uid, initialDockUid);
    }
  };

  useLayoutEffect(() => {
    uid = context.registerPanel(uid, {
      props,
      ref,
    });

    uidRef.current = uid;

    snapToInitialDock();

    return () => {
      context.unregisterPanel(uidRef.current);
    };
  }, []);

  const getDraggedOverDock = (e) => {
    const { docks } = context;
    let newDraggedOverDock = null;

    docks.forEach((dock) => {
      const isMouseInsideDock = checkMouseEventIntersectsElement(e, dock.ref.current);

      if (isMouseInsideDock) {
        newDraggedOverDock = dock;
      }
    });

    return newDraggedOverDock;
  };

  const getPanel = () => {
    const panel = context.panels.get(uid);

    return panel;
  };

  const handleDrag = (e) => {
    const newDraggedOverDock = getDraggedOverDock(e);

    setDraggedOverDock(newDraggedOverDock);
  };

  const handleDragStart = () => {
    const { snapPanelToDock } = context;
    const dockUid = null;

    snapPanelToDock(uid, dockUid);
  };

  const handleDragStop = () => {
    const { snapPanelToDock } = context;
    const dockUid = get(draggedOverDock, 'uid') || null;

    snapPanelToDock(uid, dockUid);
  };

  const handleMouseDown = () => {
    const { movePanelToTopOfStack } = context;

    movePanelToTopOfStack(uid);
  };

  const portalTargetRef = context.panelsContainerRef;

  if (!portalTargetRef.current) return null;

  const panel = getPanel();

  if (!panel) return null;

  const handleStyle = styles.handle || {};
  const rootStyle = styles.root || {};

  const position = (() => {
    if (!panel || !panel.snappedDockUid) return null;

    return {
      x: panel.dimensions.x,
      y: panel.dimensions.y,
    };
  })();

  const style = {
    ...rootStyle,
    display: !panel || panel.isVisible ? 'block' : 'none',
    height: get(panel, 'dimensions.height') || defaultHeight,
    width: get(panel, 'dimensions.width') || defaultWidth,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: panel.zIndex,
  };

  const draggableClassName = 'handle';

  const contents = (
    <Draggable
      handle={`.${draggableClassName}`}
      defaultPosition={defaultPosition}
      position={position}
      onDrag={handleDrag}
      onMouseDown={handleMouseDown}
      onStart={handleDragStart}
      onStop={handleDragStop}
    >
      <Root ref={ref} style={style}>
        {renderTitleBar &&
          renderTitleBar({
            draggableClassName,
            styles: handleStyle,
            title,
          })}

        {!renderTitleBar && (
          <Handle className={draggableClassName} style={{ ...handleStyle }}>
            {title}
          </Handle>
        )}

        <div>{children}</div>
      </Root>
    </Draggable>
  );

  return ReactDOM.createPortal(contents, portalTargetRef.current);
}

Panel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  context: PropTypes.shape({
    docks: PropTypes.instanceOf(Map).isRequired,
    panels: PropTypes.instanceOf(Map).isRequired,
    registerDock: PropTypes.func.isRequired,
    registerPanel: PropTypes.func.isRequired,
    snapPanelToDock: PropTypes.func.isRequired,
  }).isRequired,
  defaultHeight: PropTypes.number,
  defaultPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  defaultWidth: PropTypes.number,
  initialDockUid: PropTypes.string,
  renderTitleBar: PropTypes.func,
  styles: PropTypes.shape({
    handle: PropTypes.object,
    root: PropTypes.object,
  }),
  title: PropTypes.string,
  uid: PropTypes.string,
};

Panel.defaultProps = {
  defaultHeight: null,
  defaultWidth: null,
  defaultPosition: undefined,
  initialDockUid: null,
  renderTitleBar: null,
  styles: {},
  title: 'Panel',
  uid: null,
};

export default withContext(Panel);
