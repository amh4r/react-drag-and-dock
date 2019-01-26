import { Component } from "react";

import DockablePanel from "./DockablePanel";
import DockableProvider from "./DockableProvider";
import DockableTarget from "./DockableTarget";

class Dockable extends Component {
  static Panel = DockablePanel;

  static Provider = DockableProvider;

  static Target = DockableTarget;

  render() {
    return null;
  }
}

export default Dockable;
