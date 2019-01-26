import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DockableTarget extends Component {
  constructor() {
    super();
    this.ref = React.createRef();
  }

  componentDidMount() {
    const { context } = this.props;

    context.registerTarget(this.ref);

    const targetNode = this.ref.current;

    const resizeObserver = new ResizeObserver(() => {
      context.updateTarget(this.ref);
    });

    resizeObserver.observe(targetNode);
  }

  render() {
    const { children } = this.props;

    const childProps = {
      ...children.props,
      ref: this.ref,
    };

    return React.cloneElement(children, childProps);
  }
}

DockableTarget.propTypes = {
  children: PropTypes.element.isRequired,
  context: PropTypes.shape({
    panels: PropTypes.instanceOf(Map).isRequired,
    registerPanel: PropTypes.func.isRequired,
    registerTarget: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
    targets: PropTypes.instanceOf(Map).isRequired,
  }).isRequired,
};

export default DockableTarget;
