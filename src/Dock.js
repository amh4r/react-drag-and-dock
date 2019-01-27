import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withContext from './withContext';

class Dock extends Component {
  constructor() {
    super();
    this.ref = React.createRef();

    this.state = {
      panels: new Map(),
    };
  }

  componentDidMount() {
    const { context } = this.props;

    context.registerDock(this.ref, this.props);

    const { parentNode } = this.ref.current;

    const resizeObserver = new ResizeObserver(() => {
      context.updateDock(this.ref, this.props);
    });

    resizeObserver.observe(parentNode);
  }

  getPanels = () => {
    const { context } = this.props;
    const dock = context.provider.docks.get(this.ref);

    if (!dock) return new Map();

    return dock.panels;
  };

  render() {
    // const panels = this.getPanels();

    // console.log(panels);

    return (
      <div ref={this.ref}>
        <div>hi</div>
      </div>
    );
  }
}

Dock.propTypes = {
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
