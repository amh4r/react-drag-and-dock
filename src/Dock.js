import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withContext from './withContext';

class Dock extends Component {
  constructor() {
    super();
    this.ref = React.createRef();
  }

  componentDidMount() {
    const { context } = this.props;

    context.registerDock(this.ref, this.props);

    const dockNode = this.ref.current;

    const resizeObserver = new ResizeObserver(() => {
      context.updateDock(this.ref, this.props);
    });

    resizeObserver.observe(dockNode);
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

Dock.propTypes = {
  children: PropTypes.element.isRequired,
  context: PropTypes.shape({
    panels: PropTypes.instanceOf(Map).isRequired,
    registerPanel: PropTypes.func.isRequired,
    registerDock: PropTypes.func.isRequired,
    snapToDock: PropTypes.func.isRequired,
    docks: PropTypes.instanceOf(Map).isRequired,
  }).isRequired,
  id: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
};

Dock.defaultProps = {
  id: null,
};

export default withContext(Dock);
