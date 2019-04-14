import React, { useLayoutEffect, useRef, useState } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Rnd } from 'react-rnd';

import withContext from '../withContext';
import { defaultComponents } from './components';

function Panel(props) {
  const {
    children,
    context,
    defaultHeight,
    defaultPosition,
    defaultWidth,
    initialDockSection,
    initialDockUid,
    styles,
    title,
    uid: propsUid,
  } = props;

  const ref = useRef(null);
  const uidRef = useRef(propsUid);
  const [draggedOverDock, setDraggedOverDock] = useState(null);
  const [hoverSectionOnDock, setHoverSectionOnDock] = useState(null);
  let uid = uidRef.current;

  const snapToInitialDock = () => {
    if (initialDockUid) {
      const { snapPanelToDockSection } = context;

      snapPanelToDockSection(uid, initialDockUid, initialDockSection);
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

  const getDraggedOverDockAndSection = (e) => {
    const { docks } = context;
    let newDraggedOverDock = null;
    let newHoverSectionOnDock = null;

    docks.forEach((dock) => {
      const { isOver = false, hoverSection = null } = dock.hover(e);

      if (isOver) {
        newDraggedOverDock = dock;
        newHoverSectionOnDock = hoverSection;
      }
    });

    return { newDraggedOverDock, newHoverSectionOnDock };
  };

  const getPanel = () => {
    const panel = context.panels.get(uid);

    return panel;
  };

  const handleDrag = (e) => {
    const { previewPanelOnDock } = context;
    const { newDraggedOverDock, newHoverSectionOnDock } = getDraggedOverDockAndSection(e);

    setDraggedOverDock(newDraggedOverDock);
    setHoverSectionOnDock(newHoverSectionOnDock);

    const dockUid = get(draggedOverDock, 'uid') || null;
    /* TODO: Check performace impact. */
    previewPanelOnDock(uid, dockUid, hoverSectionOnDock);
  };

  const handleDragStart = () => {
    const { snapPanelToDock } = context;
    const dockUid = null;
    snapPanelToDock(uid, dockUid, false);
  };

  const handleDragStop = () => {
    const { snapPanelToDockSection } = context;
    const dockUid = get(draggedOverDock, 'uid') || null;
    snapPanelToDockSection(uid, dockUid, hoverSectionOnDock);
  };

  const handleMouseDown = () => {
    const { movePanelToTopOfStack } = context;

    movePanelToTopOfStack(uid);
  };

  const handleResize = (e, direction, ref, delta, position) => {
    let dimensions = getPanel().dimensions;
    dimensions = {
      ...dimensions,
      ...position,
      height: ref.offsetHeight,
      width: ref.offsetWidth,
    };
    context.updatePanel(uid, { dimensions });
  };

  const portalTargetRef = context.panelsContainerRef;

  if (!portalTargetRef.current) return null;

  const panel = getPanel();

  if (!panel) return null;

  const handleStyle = styles.handle || {};
  const rootStyle = styles.root || {};
  let areaStyle = styles.area || {};

  const position = (() => {
    if (!panel || !panel.snappedDockUid) return null;

    return {
      x: panel.dimensions.x,
      y: panel.dimensions.y,
    };
  })();

  const enableResizing = (() => {
    return {
      top: panel.snappedDockUid === null,
      right: panel.snappedDockUid === null,
      bottom: panel.snappedDockUid === null,
      left: panel.snappedDockUid === null,
      topRight: panel.snappedDockUid === null,
      bottomRight: panel.snappedDockUid === null,
      bottomLeft: panel.snappedDockUid === null,
      topLeft: panel.snappedDockUid === null,
    };
  })();

  const style = {
    ...rootStyle,
    display: !panel || panel.isVisible ? 'flex' : 'none',
    height: get(panel, 'dimensions.height') || defaultHeight,
    width: get(panel, 'dimensions.width') || defaultWidth,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: panel.zIndex,
    flexDirection: 'column',
  };

  const draggableClassName = 'handle';
  const isDocked = panel.snappedDockUid !== null;
  const { PanelArea, RootContainer, TitleBar } = defaultComponents(props);

  const contents = (
    <Rnd
      dragHandleClassName={draggableClassName}
      default={{
        height: style.height,
        width: style.width,
        ...defaultPosition,
      }}
      size={{ height: style.height, width: style.width }}
      resizeHandleStyles={{
        bottom: { cursor: 'ns-resize' },
        top: { cursor: 'ns-resize' },
        left: { cursor: 'ew-resize' },
        right: { cursor: 'ew-resize' },
      }}
      position={position}
      onDrag={handleDrag}
      onMouseDown={handleMouseDown}
      onDragStart={handleDragStart}
      onDragStop={handleDragStop}
      onResize={handleResize}
      enableResizing={enableResizing}
      ref={ref}
      // bounds="window"
      style={{ zIndex: panel.zIndex, visibility: !panel || panel.isVisible ? 'visible' : 'hidden' }}
    >
      <RootContainer isDocked={isDocked} style={style}>
        <TitleBar
          isDocked={isDocked}
          draggableClassName={draggableClassName}
          style={handleStyle}
          title={title}
        />
        <PanelArea isDocked={isDocked} style={areaStyle}>
          {children}
        </PanelArea>
      </RootContainer>
    </Rnd>
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
  defaultHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  defaultPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  components: PropTypes.shape({
    RootContainer: PropTypes.func,
    TitleBar: PropTypes.func,
    PanelArea: PropTypes.func,
  }),
  defaultWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  initialDockSection: PropTypes.string,
  initialDockUid: PropTypes.string,
  renderTitleBar: PropTypes.func,
  styles: PropTypes.shape({
    area: PropTypes.object,
    handle: PropTypes.object,
    root: PropTypes.object,
  }),
  title: PropTypes.string,
  uid: PropTypes.string,
};

Panel.defaultProps = {
  defaultHeight: '60',
  defaultWidth: '120',
  defaultPosition: undefined,
  initialDockUid: null,
  renderTitleBar: null,
  styles: {},
  title: 'Panel',
  uid: null,
};

export default withContext(Panel);
