import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';

import { checkMouseEventIntersectsElement } from './utils';
import withContext from '../withContext';
import { Handle, Root } from './styles';

class Panel extends React.Component {
  isDraggedOverDock = false;

  ref = React.createRef();

  uid = null;

  componentDidMount() {
    const { context, uid } = this.props;

    this.uid = context.registerPanel(uid, {
      props: this.props,
      ref: this.ref,
      renderContents: this.renderContents,
    });

    this.snapToInitialDock();
  }

  snapToInitialDock = () => {
    const { context, initialDockUid } = this.props;

    if (initialDockUid) {
      const { snapPanelToDock } = context;

      snapPanelToDock(this.uid, initialDockUid);
    }
  };

  getDraggedOverDock = (e) => {
    const { context } = this.props;
    const { docks } = context;
    let draggedOverDock = null;

    docks.forEach((dock) => {
      const isMouseInsideDock = checkMouseEventIntersectsElement(e, dock.ref.current);

      if (isMouseInsideDock) {
        draggedOverDock = dock;
      }
    });

    return draggedOverDock;
  };

  getPanel = () => {
    const { context } = this.props;
    const panel = context.panels.get(this.uid);

    return panel;
  };

  handleDrag = (e) => {
    this.draggedOverDock = this.getDraggedOverDock(e);
  };

  handleDragStart = () => {
    const { context } = this.props;
    const { snapPanelToDock } = context;
    const dockUid = null;

    snapPanelToDock(this.uid, dockUid);
  };

  handleDragStop = () => {
    const { context } = this.props;
    const { snapPanelToDock } = context;
    const dockUid = get(this, 'draggedOverDock.uid') || null;

    snapPanelToDock(this.uid, dockUid);
  };

  handleMouseDown = () => {
    const { context } = this.props;
    const { movePanelToTopOfStack } = context;

    movePanelToTopOfStack(this.uid);
  };

  render() {
    const {
      children,
      context,
      defaultHeight,
      defaultPosition,
      defaultWidth,
      styles,
      title,
    } = this.props;

    const portalTargetRef = context.panelsContainerRef;

    if (!portalTargetRef.current) return null;

    const panel = this.getPanel();
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

    const contents = (
      <Draggable
        handle=".handle"
        defaultPosition={defaultPosition}
        position={position}
        onDrag={this.handleDrag}
        onMouseDown={this.handleMouseDown}
        onStart={this.handleDragStart}
        onStop={this.handleDragStop}
      >
        <Root ref={this.ref} style={style}>
          <Handle className="handle" style={{ ...handleStyle }}>
            {title}
          </Handle>

          <div>{children}</div>
        </Root>
      </Draggable>
    );

    return ReactDOM.createPortal(contents, portalTargetRef.current);
  }
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
  styles: {},
  title: 'Panel',
  uid: null,
};

export default withContext(Panel);
