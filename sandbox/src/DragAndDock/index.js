import { Component } from 'react';

import DockablePanel from './DockablePanel';
import DockableProvider from './DockableProvider';
import DockableTarget from './DockableTarget';

class Dockable extends Component {
  render() {
    return null;
  }
}

Dockable.Panel = DockablePanel;

Dockable.Provider = DockableProvider;

Dockable.Target = DockableTarget;

export default Dockable;
