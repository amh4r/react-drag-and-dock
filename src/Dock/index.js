import React, { Component, Fragment } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';

import withContext from '../withContext';
import PanelTabs from './PanelTabs';

class Dock extends Component {
  constructor() {
    super();
    this.dockableAreaRef = React.createRef();
    this.ref = React.createRef();
    this.uid = null;
  }

  componentDidMount() {
    const { context, uid } = this.props;

    this.uid = context.registerDock(uid, {
      dockableAreaRef: this.ref,
      props: this.props,
      ref: this.ref,
    });

    const { parentNode } = this.ref.current;

    const resizeObserver = new ResizeObserver(() => {
      context.updateDock(this.uid, this.props);
    });

    resizeObserver.observe(parentNode);
  }

  getDock = () => {
    const { context } = this.props;
    const dock = context.provider.docks.get(this.uid);

    return dock;
  };

  getPanels = () => {
    const dock = this.getDock();

    if (!dock) return new Map();

    return dock.panels;
  };

  handleTabClick = (panelUid) => {
    const { context } = this.props;
    const { setDockActivePanel } = context;

    setDockActivePanel(this.uid, panelUid);
  };

  render() {
    const { children } = this.props;
    const dock = this.getDock();
    const panels = this.getPanels();
    const activePanelUid = dock ? dock.activePanelUid : null;
    const arePanelTabsVisible = get(dock, 'arePanelTabsVisible') || false;

    const childProps = {
      ...children.props,
      ref: this.ref,
      style: {
        ...children.props.style,
      },
    };

    const dockRect = dock ? dock.ref.current.getBoundingClientRect() : null;

    const position = (() => {
      if (!dockRect) return null;

      return {
        x: dockRect.x + window.scrollX,
        y: dockRect.y + window.scrollY,
      };
    })();

    const width = dockRect ? dockRect.width : null;

    return (
      <Fragment>
        {arePanelTabsVisible && (
          <PanelTabs
            activePanelUid={activePanelUid}
            dockRef={this.ref}
            height={dock.panelTabsHeight}
            panels={panels}
            position={position}
            width={width}
            onTabClick={this.handleTabClick}
          />
        )}

        {React.cloneElement(children, childProps)}
      </Fragment>
    );
  }
}

Dock.propTypes = {
  children: PropTypes.element.isRequired,
  context: PropTypes.shape({
    docks: PropTypes.instanceOf(Map).isRequired,
    panels: PropTypes.instanceOf(Map).isRequired,
    registerDock: PropTypes.func.isRequired,
    registerPanel: PropTypes.func.isRequired,
    snapPanelToDock: PropTypes.func.isRequired,
  }).isRequired,
  uid: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
};

Dock.defaultProps = {
  uid: null,
};

export default withContext(Dock);
