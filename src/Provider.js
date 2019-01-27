import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Context from './Context';

export class Provider extends Component {
  constructor() {
    super();

    /* Seems redundant, but necessary since setState() is async. */
    this.panels = new Map();
    this.docks = new Map();

    this.state = {
      panels: this.panels,
      docks: this.docks,
    };
  }

  registerPanel = (ref, props = {}) => {
    this.updatePanel(ref, props);
  };

  registerDock = (ref, props = {}) => {
    this.updateDock(ref, props);
  };

  updatePanel = (ref, props = {}) => {
    const oldPanel = this.panels.get(ref);

    const newPanel = {
      ...oldPanel,
      props,
      ref,
    };

    this.panels = new Map([...this.panels]).set(ref, newPanel);

    this.setState({ panels: this.panels });
  };

  updateDock = (ref, props = {}) => {
    const oldDock = this.docks.get(ref);

    const newDock = {
      panels: new Set(),
      ...oldDock,
      props,
      ref,
    };

    this.docks = new Map([...this.docks]).set(ref, newDock);

    this.setState({ docks: this.docks });
  };

  snapToDock = (panelRef, dockRef) => {
    const panel = this.panels.get(panelRef);
    const newSnappedDock = dockRef || null;

    const newPanel = {
      ...panel,
      snappedDock: newSnappedDock,
    };

    this.panels = new Map([...this.panels]).set(panelRef, newPanel);
    this.removePanelFromDocks(panelRef);
    this.addPanelToDock(panelRef, dockRef);

    this.setState({
      docks: this.docks,
      panels: this.panels,
    });
  };

  addPanelToDock = (panelRef, dockRef) => {
    const dock = this.docks.get(dockRef);
    const panel = this.panels.get(panelRef);

    const newDock = {
      ...dock,
      panels: new Map(dock.panels).set(panelRef, panel),
    };

    this.docks = new Map([...this.docks]).set(dockRef, newDock);
  };

  removePanelFromDocks = (panelRef) => {
    new Map(this.docks).forEach((dock, key) => {
      const { panels } = dock;

      if (panels.has(panelRef)) {
        const newPanels = new Map(panels);

        newPanels.delete(panelRef);

        const newDock = {
          ...dock,
          panels: newPanels,
        };

        this.docks = new Map(this.docks).set(key, newDock);
      }
    });
  };

  render() {
    const { children } = this.props;
    const { panels, docks } = this.state;

    const contextValue = {
      panels,
      provider: this,
      registerPanel: this.registerPanel,
      registerDock: this.registerDock,
      snapToDock: this.snapToDock,
      docks,
      updateDock: this.updateDock,
    };

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
  }
}

Provider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
    .isRequired,
};

export default Provider;
