import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AreaDock from './AreaDock';
import Center from './Center';
import Panel from '../Panel';
import Provider from '../Provider';

class Area extends Component {
  getChildren = () => {
    const { children } = this.props;
    let center = null;
    let left = null;
    const panels = [];
    let right = null;

    React.Children.toArray(children).forEach((child) => {
      if (child.type === AreaDock) {
        const { location } = child.props;

        if (location === 'left') {
          left = child;
        }

        if (location === 'right') {
          right = child;
        }
      }

      if (child.type === Center) {
        center = child;
      }

      if (child.type === Panel) {
        panels.push(child);
      }
    });

    return {
      center,
      left,
      panels,
      right,
    };
  };

  render() {
    const { center, left, panels, right } = this.getChildren();

    return (
      <Provider>
        <div
          style={{
            alignItems: 'stretch',
            display: 'flex',
            height: '100%',
            position: 'relative',
          }}
        >
          {left}
          {center}
          {right}
          {panels}
        </div>
      </Provider>
    );
  }
}

Area.Center = Center;
Area.Dock = AreaDock;
Area.Panel = Panel;

Area.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
    .isRequired,
};

export default Area;
