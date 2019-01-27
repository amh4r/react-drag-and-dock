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
    const { panels } = this;
    const newPanels = new Map([...panels]);

    const data = {
      id: props.id,
      ref,
    };

    newPanels.set(ref, data);
    this.panels = newPanels;

    this.setState({ panels: this.panels });
  };

  updateDock = (ref, props = {}) => {
    const { docks } = this;
    const newDocks = new Map([...docks]);

    const data = {
      id: props.id,
      ref,
    };

    newDocks.set(ref, data);
    this.docks = newDocks;

    this.setState({ docks: this.docks });
  };

  snapToDock = (panelRef, dockRef) => {
    const panel = this.panels.get(panelRef);
    const newSnappedDock = dockRef || null;

    const newPanel = {
      ...panel,
      snappedDock: newSnappedDock,
    };

    this.panels.set(panelRef, newPanel);

    this.setState({ panels: this.panels });
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
