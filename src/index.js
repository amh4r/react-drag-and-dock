import { Component } from 'react';

import Dock from './Dock';
import Panel from './Panel';
import Provider from './Provider';

class Dockable extends Component {
  render() {
    return null;
  }
}

Dockable.Dock = Dock;

Dockable.Panel = Panel;

Dockable.Provider = Provider;

export default Dockable;
