import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

import {
  changeDockActivePanel,
  getPanelDimensions,
  registerDock,
  registerPanel,
  snapPanelToDock,
  updateDock,
  updatePanel,
} from './utils';
import Context from '../Context';

export class Provider extends Component {
  positionObserverInterval = null;

  constructor() {
    super();

    /* Seems redundant, but necessary since setState() is async. */
    this.panels = new Map();
    this.docks = new Map();

    this.dockPositions = new Map();
    this.panelsContainerRef = React.createRef();
    this.panelTabsContainerRef = React.createRef();

    this.state = {
      panels: this.panels,
      docks: this.docks,
    };
  }

  componentDidMount() {
    this.createPanelTabsContainer();

    this.positionObserverInterval = setInterval(() => {
      // this.handleDockPositionChanges();
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.positionObserverInterval);
  }

  createPanelTabsContainer = () => {
    // this.panelTabsContainer = document.createElement('div');
    // this.panelTabsContainer = React.createElement(<div>hi</div>)
    // document.body.appendChild(this.panelTabsContainer);
    // ReactDOM.render(<div>hi</div>, document.body);
    // ReactDOM.createPortal(<div ref={this.panelTabsContainerRef}>hi</div>, document.body);
  };

  handleDockPositionChanges = () => {
    this.docks.forEach((dock, dockUid) => {
      const prevDockPosition = this.dockPositions.get(dock.ref);

      const { x, y } = dock.ref.current.getBoundingClientRect();
      const newDockPosition = { x, y };

      if (!prevDockPosition || !isEqual(newDockPosition, prevDockPosition)) {
        this.dockPositions.set(dock.ref, newDockPosition);

        dock.panels.forEach((dockPanel) => {
          const newPanelDimensions = getPanelDimensions({
            initialDimensions: dockPanel.initialDimensions,
            dock,
            panel: dockPanel,
          });

          const newPanelData = {
            dimensions: newPanelDimensions,
          };

          this.updatePanel(dockPanel.ref, newPanelData);
        });
      }
    });
  };

  registerDock = (uid, data) => {
    uid = uid || uuidv4();

    const { newDocks } = registerDock({ data, docks: this.docks, uid });

    this.docks = newDocks;

    this.setState({ docks: this.docks });

    return uid;
  };

  registerPanel = (ref, data) => {
    this.panels = registerPanel({ data, ref, panels: this.panels });

    this.setState({ panels: this.panels });
  };

  updateDock = (dockUid, newData) => {
    this.docks = updateDock({
      docks: this.docks,
      dockUid,
      newData,
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

  snapToDock = (panelRef, dockUid) => {
    const { newDocks, newPanels } = snapPanelToDock({
      docks: this.docks,
      dockUid,
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
      panelsContainerRef: this.panelsContainerRef,
      panelTabsContainerRef: this.panelTabsContainerRef,
      provider: this,
      registerPanel: this.registerPanel,
      registerDock: this.registerDock,
      setDockActivePanel: this.setDockActivePanel,
      snapToDock: this.snapToDock,
      updateDock: this.updateDock,
    };

    return (
      <Context.Provider value={contextValue}>
        {children}
        {ReactDOM.createPortal(<div ref={this.panelTabsContainerRef} />, document.body)}
        {ReactDOM.createPortal(<div ref={this.panelsContainerRef} />, document.body)}
      </Context.Provider>
    );
  }
}

Provider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
    .isRequired,
};

export default Provider;
