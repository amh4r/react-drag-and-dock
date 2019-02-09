import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';

import { checkMouseEventIntersectsElement } from './utils';
import withContext from '../withContext';
import { Handle, Root } from './styles';

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.isDraggedOverDock = false;
    this.ref = React.createRef();
    this.uid = null;

    this.state = {
      isGrabbing: false,
    };
  }

  componentDidMount() {
    const { context, uid } = this.props;

    this.uid = context.registerPanel(uid, {
      props: this.props,
      ref: this.ref,
    });

    this.snapToInitialDock();
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
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

    this.setState({
      isGrabbing: true,
    });
  };

  handleDragStop = () => {
    const { context } = this.props;
    const { snapPanelToDock } = context;
    const dockUid = get(this, 'draggedOverDock.uid') || null;

    snapPanelToDock(this.uid, dockUid);

    this.setState({
      isGrabbing: false,
    });
  };

  render() {
    const { children, defaultHeight, defaultPosition, defaultWidth, styles, title } = this.props;
    const { isGrabbing } = this.state;
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
      zIndex: isGrabbing ? 100000 : 'auto',
    };

    const contents = (
      <Draggable
        handle=".handle"
        defaultPosition={defaultPosition}
        position={position}
        onStart={this.handleDragStart}
        onDrag={this.handleDrag}
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

    return ReactDOM.createPortal(contents, document.body);
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
