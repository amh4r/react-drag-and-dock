import React, { Component } from 'react';

import Dock from '../Dock';

class LeftDock extends Component {
  render() {
    const { width } = this.props;

    return (
      <Dock uid="left">
        <div
          style={{
            background: 'rgba(255, 0, 0, 0.3)',
            height: '100%',
            width,
            position: 'absolute',
            left: 0,
          }}
        />
      </Dock>
    );
  }
}

export default LeftDock;
