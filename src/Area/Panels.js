import React, { Component } from 'react';

import Panel from '../Panel';

class Panels extends Component {
  render() {
    const { children } = this.props;

    return React.Children.toArray(children).map((child) => {
      return <Panel title="hi">{child}</Panel>;
    });
  }
}

export default Panels;
