import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withContext from './withContext';

class DockableTarget extends Component {
  constructor() {
    super();
    this.ref = React.createRef();
  }

  componentDidMount() {
    const { context } = this.props;

    context.registerTarget(this.ref, this.props);

    const targetNode = this.ref.current;

    const resizeObserver = new ResizeObserver(() => {
      context.updateTarget(this.ref, this.props);
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
    snapToTarget: PropTypes.func.isRequired,
    targets: PropTypes.instanceOf(Map).isRequired,
  }).isRequired,
  id: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
};

DockableTarget.defaultProps = {
  id: null,
};

export default withContext(DockableTarget);
