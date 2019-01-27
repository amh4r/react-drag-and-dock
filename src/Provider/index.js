import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  changeDockActivePanel,
  registerDock,
  registerPanel,
  snapPanelToDock,
  updateDock,
  updatePanel,
} from './utils';
import Context from '../Context';

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

  registerDock = (ref, data) => {
    this.docks = registerDock({ data, ref, docks: this.docks });

    this.setState({ docks: this.docks });
  };

  registerPanel = (ref, data) => {
    this.panels = registerPanel({ data, ref, panels: this.panels });

    this.setState({ panels: this.panels });
  };

  updateDock = (ref, newData) => {
    this.docks = updateDock({
      newData,
      ref,
      docks: this.docks,
    });

    this.setState({ docks: this.docks });
  };

  updatePanel = (ref, newData) => {
    this.panels = updatePanel({
      newData,
      ref,
      panels: this.panels,
    });

    this.setState({ panels: this.panels });
  };

  setDockActivePanel = (dockRef, activePanelRef) => {
    const { newDocks, newPanels } = changeDockActivePanel({
      dockRef,
      docks: this.docks,
      activePanelRef,
      panels: this.panels,
    });

    this.docks = newDocks;
    this.panels = newPanels;

    this.setState({
      docks: this.docks,
      panels: this.panels,
    });
  };

  snapToDock = (panelRef, dockRef) => {
    const { newDocks, newPanels } = snapPanelToDock({
      docks: this.docks,
      dockRef,
      panels: this.panels,
      panelRef,
    });

    this.docks = newDocks;
    this.panels = newPanels;

    this.setState({
      docks: this.docks,
      panels: this.panels,
    });
  };

  render() {
    const { children } = this.props;
    const { panels, docks } = this.state;

    const contextValue = {
      docks,
      panels,
      provider: this,
      registerPanel: this.registerPanel,
      registerDock: this.registerDock,
      setDockActivePanel: this.setDockActivePanel,
      snapToDock: this.snapToDock,
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
