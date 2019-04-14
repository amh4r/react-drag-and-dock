import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

import {
  changeDockActivePanel,
  getPanelDimensions,
  movePanelToTopOfStack,
  previewPanelOnDock,
  registerDock,
  registerPanel,
  snapPanelToDock,
  snapPanelToDockSection,
  unregisterPanel,
  updateDock,
  updatePanel,
} from './utils';
import Context from '../Context';

/* Probably don't refactor this to a function component. */
class Provider extends Component {
  positionObserverInterval = null;

  constructor() {
    super();

    /* Seems redundant, but necessary since setState() is async. */
    this.panels = new Map();
    this.docks = new Map();

    this.dockPositions = new Map();
    this.panelTabsContainerRef = React.createRef();
    this.panelsContainerRef = React.createRef();

    this.state = {
      panels: this.panels,
      docks: this.docks,
    };
  }

  componentDidMount() {
    this.positionObserverInterval = setInterval(() => {
      this.handleDockPositionChanges();
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.positionObserverInterval);
  }

  handleDockPositionChanges = () => {
    this.docks.forEach((dock, dockUid) => {
      const prevDockPosition = this.dockPositions.get(dockUid);
      const { x, y, height } = dock.ref.current.getBoundingClientRect();

      const newDockPosition = {
        height,
        x: x + window.scrollX,
        y: y + window.scrollY,
      };

      if (!prevDockPosition || !isEqual(newDockPosition, prevDockPosition)) {
        this.dockPositions.set(dockUid, newDockPosition);

        dock.panels.forEach((dockPanel, dockPanelUid) => {
          const panel = this.panels.get(dockPanelUid);
          const newPanelDimensions = getPanelDimensions({
            dock,
            dockSection: panel.dockSection,
          });

          const newPanelData = {
            dimensions: newPanelDimensions,
          };

          this.updatePanel(dockPanelUid, newPanelData);
        });
      }
    });
  };

  registerDock = (dockUid, data) => {
    dockUid = dockUid || uuidv4();

    this.docks = registerDock({
      data,
      docks: this.docks,
      dockUid,
    });

    this.setState({ docks: this.docks });

    return dockUid;
  };

  registerPanel = (panelUid, data) => {
    panelUid = panelUid || uuidv4();

    this.panels = registerPanel({
      data,
      panels: this.panels,
      panelUid,
    });

    this.setState({ panels: this.panels });

    return panelUid;
  };

  unregisterDock = (dockUid) => {
    const { newDocks } = unregisterPanel({
      docks: this.docks,
      dockUid,
    });

    this.docks = newDocks;

    this.setState({
      docks: this.docks,
    });
  };

  unregisterPanel = (panelUid) => {
    const { newDocks, newPanels } = unregisterPanel({
      docks: this.docks,
      panels: this.panels,
      panelUid,
    });

    this.docks = newDocks;
    this.panels = newPanels;

    this.setState({
      docks: this.docks,
      panels: this.panels,
    });
  };

  updateDock = (dockUid, newData) => {
    this.docks = updateDock({
      docks: this.docks,
      dockUid,
      newData,
    });

    this.setState({ docks: this.docks });
  };

  updatePanel = (panelUid, newData) => {
    this.panels = updatePanel({
      newData,
      panels: this.panels,
      panelUid,
    });

    this.setState({ panels: this.panels });
  };

  setDockActivePanel = (dockUid, activePanelUid) => {
    const { newDocks, newPanels } = changeDockActivePanel({
      activePanelUid,
      docks: this.docks,
      dockUid,
      panels: this.panels,
    });

    this.docks = newDocks;
    this.panels = newPanels;

    this.setState({
      docks: this.docks,
      panels: this.panels,
    });
  };

  snapPanelToDock = (panelUid, dockUid) => {
    const { newDocks, newPanels } = snapPanelToDock({
      docks: this.docks,
      dockUid,
      panels: this.panels,
      panelUid,
    });

    this.docks = newDocks;
    this.panels = newPanels;

    this.setState({
      docks: this.docks,
      panels: this.panels,
    });
  };

  snapPanelToDockSection = (panelUid, dockUid, dockSection) => {
    const { newDocks, newPanels } = snapPanelToDockSection({
      docks: this.docks,
      dockUid,
      panels: this.panels,
      panelUid,
      dockSection,
    });

    this.docks = newDocks;
    this.panels = newPanels;

    this.setState({
      docks: this.docks,
      panels: this.panels,
    });
  };

  movePanelToTopOfStack = (panelUid) => {
    this.panels = movePanelToTopOfStack({
      panels: this.panels,
      panelUid,
    });

    this.setState({
      panels: this.panels,
    });
  };

  previewPanelOnDock = (panelUid, dockUid, hoverSectionOnDock) => {
    const { newDocks, newPanels } = previewPanelOnDock({
      dockUid,
      hoverSectionOnDock,
      panelUid,
      docks: this.docks,
      panels: this.panels,
    });

    this.docks = newDocks;
    this.panels = newPanels;
    this.setState({ docks: this.docks, panels: this.panels });
  };

  render() {
    const { children } = this.props;
    const { panels, docks } = this.state;

    const contextValue = {
      docks,
      movePanelToTopOfStack: this.movePanelToTopOfStack,
      panels,
      panelsContainerRef: this.panelsContainerRef,
      panelTabsContainerRef: this.panelTabsContainerRef,
      previewPanelOnDock: this.previewPanelOnDock,
      provider: this,
      registerPanel: this.registerPanel,
      registerDock: this.registerDock,
      setDockActivePanel: this.setDockActivePanel,
      snapPanelToDock: this.snapPanelToDock,
      snapPanelToDockSection: this.snapPanelToDockSection,
      unregisterDock: this.unregisterDock,
      unregisterPanel: this.unregisterPanel,
      updateDock: this.updateDock,
    };

    return (
      <Context.Provider value={contextValue}>
        {ReactDOM.createPortal(<div ref={this.panelTabsContainerRef} />, document.body)}
        {ReactDOM.createPortal(
          <div ref={this.panelsContainerRef} style={{ position: 'absolute', top: 0, left: 0 }} />,
          document.body,
        )}
        {children}
      </Context.Provider>
    );
  }
}

Provider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
    .isRequired,
};

export default Provider;
