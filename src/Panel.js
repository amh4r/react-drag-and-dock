import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import styled from 'styled-components';

import withContext from './withContext';

const Handle = styled.div`
  background: #d3e4f9;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

const Root = styled.div`
  background: white;
  border: 1px solid #3a89ea;
  box-sizing: border-box;
  position: fixed;
`;

const _getDimensionsFromRef = (ref) => {
  if (!ref || !ref.current) return {};

  return ref.current.getBoundingClientRect();
};

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.deltaX = 0;
    this.deltaY = 0;
    this.el = document.createElement('div');
    this.isDraggedOverDock = false;
    this.ref = React.createRef();
    this.prevSnappedTargeDimensions = {};

    this.state = {
      height: null,
      width: null,
      left: null,
      top: null,
      isGrabbing: false,
      isVisible: true,
    };
  }

  componentDidMount() {
    document.body.appendChild(this.el);

    const { context, initialDockId } = this.props;

    context.registerPanel(this.ref, { props: this.props });

    if (initialDockId) {
      const { provider, snapToDock } = context;
      const { docks } = provider;

      const initialDock = [...docks.values()].find((dock) => {
        return dock.props.id === initialDockId;
      });

      snapToDock(this.ref, initialDock.ref);
    }
  }

  componentDidUpdate() {
    this.handlePositionChanges();
    this.handleVisibilityChanges();
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  handlePositionChanges = () => {
    const snappedDockRef = this.getSnappedDockRef();
    const didDockPanelPositionChange = this.didDockPanelPositionChange();

    if (snappedDockRef && didDockPanelPositionChange) {
      const { width, left } = _getDimensionsFromRef(snappedDockRef);
      let { height, top } = _getDimensionsFromRef(snappedDockRef);
      const { context } = this.props;
      const { docks } = context.provider;
      const dock = docks.get(snappedDockRef);

      if (dock.panels.size > 1) {
        height -= dock.panelTabsHeight;
        top += dock.panelTabsHeight;
      }

      this.setState({
        height,
        width,
        left: left - this.deltaX,
        top: top - this.deltaY,
      });
    }
  };

  handleVisibilityChanges = () => {
    const { context } = this.props;
    const { panels } = context.provider;
    const panel = panels.get(this.ref);
    const { isVisible } = this.state;

    if (isVisible !== panel.isVisible) {
      this.setState({
        isVisible: panel.isVisible,
      });
    }
  };

  didDockPanelPositionChange = () => {
    const snappedDockRef = this.getSnappedDockRef();
    const { height, width, left, top } = this.getDockPanelPosition(snappedDockRef);

    const {
      height: prevHeight,
      width: prevWidth,
      left: prevLeft,
      top: prevTop,
    } = this.prevSnappedTargeDimensions;

    this.prevSnappedTargeDimensions = {
      height,
      width,
      left,
      top,
    };

    if (height !== prevHeight || width !== prevWidth || left !== prevLeft || top !== prevTop) {
      return true;
    }

    return false;
  };

  getDockPanelPosition = (dockRef) => {
    if (!dockRef) {
      return {
        height: null,
        width: null,
        left: null,
        top: null,
      };
    }

    const { context } = this.props;
    const { docks } = context.provider;
    const { width, left } = _getDimensionsFromRef(dockRef);
    let { height, top } = _getDimensionsFromRef(dockRef);
    const dock = docks.get(dockRef);

    if (dock.panels.size > 1) {
      height -= dock.panelTabsHeight;
      top += dock.panelTabsHeight;
    }

    return {
      height,
      width,
      left,
      top,
    };
  };

  getDraggedOverDock = (e) => {
    const { context } = this.props;
    const { docks } = context;

    let draggedOverDock = null;

    docks.forEach((dock) => {
      const { bottom, left, right, top } = _getDimensionsFromRef(dock.ref);
      const isMouseInsideX = e.clientX > left && e.clientX < right;
      const isMouseInsideY = e.clientY > top && e.clientY < bottom;

      if (isMouseInsideX && isMouseInsideY) {
        draggedOverDock = dock.ref;
      }
    });

    return draggedOverDock;
  };

  getSnappedDockRef = () => {
    const { context } = this.props;
    const { panels } = context.provider;
    const panel = panels.get(this.ref);

    return panel.snappedDock;
  };

  handleDrag = (e) => {
    this.draggedOverDock = this.getDraggedOverDock(e);
  };

  handleDragStart = () => {
    const { context } = this.props;
    const { snapToDock } = context;
    const dockRef = null;

    snapToDock(this.ref, dockRef);

    this.setState({ isGrabbing: true });
  };

  handleDragStop = (e, data) => {
    this.deltaX = data.x;
    this.deltaY = data.y;
    const { context } = this.props;
    const { snapToDock } = context;

    snapToDock(this.ref, this.draggedOverDock);

    this.setState({ isGrabbing: false });
  };

  render() {
    const { children, styles, title } = this.props;
    const { height, isGrabbing, isVisible, width, left, top } = this.state;
    const handleStyle = styles.handle || {};
    const rootStyle = styles.root || {};

    const contents = (
      <Draggable
        handle=".handle"
        onStart={this.handleDragStart}
        onDrag={this.handleDrag}
        onStop={this.handleDragStop}
      >
        <Root
          ref={this.ref}
          style={{
            ...rootStyle,
            height,
            width,
            left,
            top,
            display: isVisible ? 'block' : 'none',
            zIndex: isGrabbing ? 100000 : 'auto',
          }}
        >
          <Handle className="handle" style={{ ...handleStyle }}>
            {title}
          </Handle>

          <div>{children}</div>
        </Root>
      </Draggable>
    );

    return ReactDOM.createPortal(contents, this.el);
  }
}

Panel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  context: PropTypes.shape({
    panels: PropTypes.instanceOf(Map).isRequired,
    registerPanel: PropTypes.func.isRequired,
    registerDock: PropTypes.func.isRequired,
    snapToDock: PropTypes.func.isRequired,
    docks: PropTypes.instanceOf(Map).isRequired,
  }).isRequired,
  initialDockId: PropTypes.string,
  styles: PropTypes.shape({
    handle: PropTypes.object,
    root: PropTypes.object,
  }),
  title: PropTypes.string,
};

Panel.defaultProps = {
  initialDockId: null,
  styles: {},
  title: 'Panel',
};

export default withContext(Panel);
