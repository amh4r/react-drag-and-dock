import React, { Component } from 'react';

import Dock from '../Dock';

class RightDock extends Component {
  render() {
    const { width } = this.props;

    return (
      <Dock uid="left">
        <div
          style={{
            background: 'rgba(0, 0, 255, 0.3)',
            height: '100%',
            width,
            position: 'absolute',
            right: 0,
          }}
        />
      </Dock>
    );
  }
}

export default RightDock;
