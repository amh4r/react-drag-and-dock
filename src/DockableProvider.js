import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Context from './Context';

export class DockableProvider extends Component {
  constructor() {
    super();

    /* Seems redundant, but necessary since setState() is async. */
    this.panels = new Map();
    this.targets = new Map();

    this.state = {
      panels: this.panels,
      targets: this.targets,
    };
  }

  registerPanel = (ref, props = {}) => {
    this.updatePanel(ref, props);
  };

  registerTarget = (ref, props = {}) => {
    this.updateTarget(ref, props);
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

  updateTarget = (ref, props = {}) => {
    const { targets } = this;
    const newTargets = new Map([...targets]);

    const data = {
      id: props.id,
      ref,
    };

    newTargets.set(ref, data);
    this.targets = newTargets;

    this.setState({ targets: this.targets });
  };

  snapToTarget = (panelRef, targetRef) => {
    const panel = this.panels.get(panelRef);
    const newSnappedTarget = targetRef || null;

    const newPanel = {
      ...panel,
      snappedTarget: newSnappedTarget,
    };

    this.panels.set(panelRef, newPanel);

    this.setState({ panels: this.panels });
  };

  render() {
    const { children } = this.props;
    const { panels, targets } = this.state;

    const contextValue = {
      panels,
      provider: this,
      registerPanel: this.registerPanel,
      registerTarget: this.registerTarget,
      snapToTarget: this.snapToTarget,
      targets,
      updateTarget: this.updateTarget,
    };

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
  }
}

DockableProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
    .isRequired,
};

export default DockableProvider;
