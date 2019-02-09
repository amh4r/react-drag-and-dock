import React, { Component } from 'react';
import get from 'lodash/get';

import Center from './Center';
import LeftDock from './LeftDock';
import Provider from '../Provider';
import RightDock from './RightDock';

class Area extends Component {
  getChildren = () => {
    const { children } = this.props;
    let center = null;
    let left = null;
    let right = null;

    React.Children.toArray(children).forEach((child) => {
      if (child.type === Center) {
        center = child;
      }

      if (child.type === LeftDock) {
        left = child;
      }

      if (child.type === RightDock) {
        right = child;
      }
    });

    return {
      center,
      left,
      right,
    };
  };

  renderLeft = () => {};

  render() {
    const { center, left, right } = this.getChildren();

    return (
      <Provider>
        <div style={{ alignItems: 'stretch', display: 'flex', height: '100%' }}>
          {left}

          <div style={{ flexGrow: 1 }}>{center}</div>

          {right}
        </div>
      </Provider>
    );
  }
}

Area.Center = Center;
Area.LeftDock = LeftDock;
Area.RightDock = RightDock;

export default Area;
