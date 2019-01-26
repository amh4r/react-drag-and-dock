import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';

import withContext from './withContext';

const _getDimensionsFromRef = (ref) => {
  if (!ref || !ref.current) return {};

  return ref.current.getBoundingClientRect();
};

class DockablePanel extends React.Component {
  constructor(props) {
    super(props);
    this.deltaX = 0;
    this.deltaY = 0;
    this.el = document.createElement('div');
    this.isDraggedOverTarget = false;
    this.ref = React.createRef();
    this.prevSnappedTargeDimensions = {};

    this.state = {
      height: null,
      width: null,
      left: null,
      top: null,
    };
  }

  componentDidMount() {
    document.body.appendChild(this.el);

    const { context, initialDockTargetId } = this.props;
    context.registerPanel(this.ref);

    if (initialDockTargetId) {
      const { provider, snapToTarget } = context;
      const { targets } = provider;

      const initialDockTarget = [...targets.values()].find((target) => {
        return target.id === initialDockTargetId;
      });

      snapToTarget(this.ref, initialDockTarget.ref);
    }
  }

  componentDidUpdate() {
    const snappedTarget = this.getSnappedTarget();
    const didSnappedTargetChange = this.didSnappedTargetChange();

    if (snappedTarget && didSnappedTargetChange) {
      const { height, width, left, top } = _getDimensionsFromRef(snappedTarget);

      this.setState({
        height,
        width,
        left: left - this.deltaX,
        top: top - this.deltaY,
      });
    }
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  didSnappedTargetChange = () => {
    const snappedTarget = this.getSnappedTarget();
    const { height, width, left, top } = _getDimensionsFromRef(snappedTarget);

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

  getDraggedOverTarget = (e) => {
    const { context } = this.props;
    const { targets } = context;

    let draggedOverTarget = null;

    targets.forEach((target) => {
      const { bottom, left, right, top } = _getDimensionsFromRef(target.ref);
      const isMouseInsideX = e.clientX > left && e.clientX < right;
      const isMouseInsideY = e.clientY > top && e.clientY < bottom;

      if (isMouseInsideX && isMouseInsideY) {
        draggedOverTarget = target.ref;
      }
    });

    return draggedOverTarget;
  };

  getSnappedTarget = () => {
    const { context } = this.props;
    const { panels } = context;
    const panel = panels.get(this.ref);

    return panel.snappedTarget;
  };

  handleDrag = (e) => {
    this.draggedOverTarget = this.getDraggedOverTarget(e);
  };

  handleDragStop = (e, data) => {
    this.deltaX = data.x;
    this.deltaY = data.y;
    const { context } = this.props;
    const { snapToTarget } = context;

    snapToTarget(this.ref, this.draggedOverTarget);
  };

  render() {
    const { children, styles, title } = this.props;
    const { height, width, left, top } = this.state;
    const handleStyle = styles.handle || {};
    const rootStyle = styles.root || {};

    const contents = (
      <Draggable
        handle=".handle"
        onStart={this.handleDragStart}
        onDrag={this.handleDrag}
        onStop={this.handleDragStop}
      >
        <div
          ref={this.ref}
          style={{
            background: 'white',
            border: '1px solid black',
            boxSizing: 'border-box',
            height,
            width,
            position: 'fixed',
            left,
            top,
            ...rootStyle,
          }}
        >
          <div className="handle" style={{ background: '#ccc', ...handleStyle }}>
            {title}
          </div>

          <div>{children}</div>
        </div>
      </Draggable>
    );

    return ReactDOM.createPortal(contents, this.el);
  }
}

DockablePanel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  context: PropTypes.shape({
    panels: PropTypes.instanceOf(Map).isRequired,
    registerPanel: PropTypes.func.isRequired,
    registerTarget: PropTypes.func.isRequired,
    snapToTarget: PropTypes.func.isRequired,
    targets: PropTypes.instanceOf(Map).isRequired,
  }).isRequired,
  initialDockTargetId: PropTypes.string,
  styles: PropTypes.shape({
    handle: PropTypes.object,
    root: PropTypes.object,
  }),
  title: PropTypes.string,
};

DockablePanel.defaultProps = {
  initialDockTargetId: null,
  styles: {},
  title: 'Panel',
};

export default withContext(DockablePanel);
