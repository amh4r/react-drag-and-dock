import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';

import { checkMouseEventIntersectsElement, getNextState } from './utils';
import withContext from '../withContext';
import { Handle, Root } from './styles';

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.isDraggedOverDock = false;
    this.ref = React.createRef();
    this.prevSnappedTargeDimensions = {};

    this.state = {
      height: null,
      width: null,
      isGrabbing: false,
      isVisible: true,
      initialPosition: {}, // eslint-disable-line react/no-unused-state
      ref: this.ref, // eslint-disable-line react/no-unused-state
    };
  }

  static getDerivedStateFromProps(props, state) {
    return getNextState(props, state);
  }

  componentDidMount() {
    const { context } = this.props;

    context.registerPanel(this.ref, { props: this.props });

    this.listenForPositionChange();
    this.setInitialPosition();
    this.snapToInitialDock();
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  listenForPositionChange = () => {
    let prevBoundingBox = this.ref.current.getBoundingClientRect();

    setInterval(() => {
      const boundingBox = this.ref.current.getBoundingClientRect();

      if (boundingBox.x !== prevBoundingBox.x || boundingBox.y !== prevBoundingBox.y) {
        const nextState = getNextState(this.props, this.state);

        this.setState(nextState);

        prevBoundingBox = boundingBox;
      }
    }, 500);
  };

  setInitialPosition = () => {
    const { x, y } = this.ref.current.getBoundingClientRect();

    this.setState({
      // eslint-disable-next-line react/no-unused-state
      initialPosition: {
        x: x + window.scrollX,
        y: y + window.scrollY,
      },
    });
  };

  snapToInitialDock = () => {
    const { context, initialDockId } = this.props;

    if (initialDockId) {
      const { provider, snapToDock } = context;
      const { docks } = provider;

      const initialDock = [...docks.values()].find((dock) => {
        return dock.props.id === initialDockId;
      });

      snapToDock(this.ref, initialDock.ref);
    }
  };

  getDraggedOverDock = (e) => {
    const { context } = this.props;
    const { docks } = context;

    let draggedOverDock = null;

    docks.forEach((dock) => {
      const isMouseInsideDock = checkMouseEventIntersectsElement(e, dock.ref.current);

      if (isMouseInsideDock) {
        draggedOverDock = dock.ref;
      }
    });

    return draggedOverDock;
  };

  handleDrag = (e) => {
    this.draggedOverDock = this.getDraggedOverDock(e);
  };

  handleDragStart = () => {
    const { context } = this.props;
    const { snapToDock } = context;
    const dockRef = null;

    snapToDock(this.ref, dockRef);

    this.setState({
      isGrabbing: true,
    });
  };

  handleDragStop = () => {
    const { context } = this.props;
    const { snapToDock } = context;

    snapToDock(this.ref, this.draggedOverDock);

    this.setState({
      isGrabbing: false,
    });
  };

  render() {
    const { children, styles, title } = this.props;
    const { height, isGrabbing, isVisible, position, width } = this.state;
    const handleStyle = styles.handle || {};
    const rootStyle = styles.root || {};

    const contents = (
      <Draggable
        handle=".handle"
        position={position}
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

    return ReactDOM.createPortal(contents, document.body);
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
