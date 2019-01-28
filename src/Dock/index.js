import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';

import withContext from '../withContext';
import PanelTabs from './PanelTabs';

class Dock extends Component {
  constructor() {
    super();
    this.ref = React.createRef();
    this.dockableAreaRef = React.createRef();
  }

  componentDidMount() {
    const { context } = this.props;

    context.registerDock(this.ref, {
      props: this.props,
      dockableAreaRef: this.dockableAreaRef,
    });

    const { parentNode } = this.ref.current;

    const resizeObserver = new ResizeObserver(() => {
      context.updateDock(this.ref, this.props);
    });

    resizeObserver.observe(parentNode);
  }

  getDock = () => {
    const { context } = this.props;
    const dock = context.provider.docks.get(this.ref);

    return dock;
  };

  getPanels = () => {
    const dock = this.getDock();

    if (!dock) return new Map();

    return dock.panels;
  };

  handleTabClick = (panel) => {
    const { context } = this.props;
    const { setDockActivePanel } = context;

    setDockActivePanel(this.ref, panel.ref);
  };

  render() {
    const { children } = this.props;
    const dock = this.getDock();
    const panels = this.getPanels();
    const activePanelRef = dock ? dock.activePanelRef : null;
    const shouldShowPanelTabs = panels.size > 1;

    if (shouldShowPanelTabs) {
      return (
        <div ref={this.ref} style={{ display: 'flex', flexDirection: 'column' }}>
          <PanelTabs
            activePanelRef={activePanelRef}
            panels={panels}
            onTabClick={this.handleTabClick}
          />

          <div ref={this.dockableAreaRef} style={{ flexGrow: 1 }} />
        </div>
      );
    }

    const childProps = {
      ...children.props,
      ref: this.dockableAreaRef,
    };

    return <div ref={this.ref}>{React.cloneElement(children, childProps)}</div>;
  }
}

Dock.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  context: PropTypes.shape({
    panels: PropTypes.instanceOf(Map).isRequired,
    registerPanel: PropTypes.func.isRequired,
    registerDock: PropTypes.func.isRequired,
    snapToDock: PropTypes.func.isRequired,
    docks: PropTypes.instanceOf(Map).isRequired,
  }).isRequired,
  id: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
};

Dock.defaultProps = {
  id: null,
};

export default withContext(Dock);
