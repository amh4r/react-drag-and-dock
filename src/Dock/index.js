import React, { Fragment, useLayoutEffect, useRef } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';

import withContext from '../withContext';
import PanelTabs from './PanelTabs';

function Dock(props) {
  const { children, context, uid: propsUid } = props;
  const ref = useRef(null);
  const uidRef = useRef(propsUid);
  let uid = uidRef.current;

  useLayoutEffect(() => {
    uid = context.registerDock(uid, {
      props,
      ref,
    });

    uidRef.current = uid;

    const { parentNode } = ref.current;

    const resizeObserver = new ResizeObserver(() => {
      context.updateDock(uid, props);
    });

    resizeObserver.observe(parentNode);

    return () => {
      context.unregisterDock(uidRef.current);
    };
  }, []);

  const getDock = () => {
    const dock = context.provider.docks.get(uid);

    return dock;
  };

  const getPanels = () => {
    const dock = getDock();

    if (!dock) return new Map();

    return dock.panels;
  };

  const handleTabClick = (panelUid) => {
    const { setDockActivePanel } = context;

    setDockActivePanel(uid, panelUid);
  };

  const { panelTabsContainerRef } = context;
  const dock = getDock();
  const panels = getPanels();
  const activePanelUid = dock ? dock.activePanelUid : null;
  const arePanelTabsVisible = get(dock, 'arePanelTabsVisible') || false;

  const childProps = {
    ...children.props,
    dock,
    ref,
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
          dockRef={ref}
          height={dock.panelTabsHeight}
          panels={panels}
          portalTargetRef={panelTabsContainerRef}
          position={position}
          width={width}
          onTabClick={handleTabClick}
        />
      )}

      {React.cloneElement(children, childProps)}
    </Fragment>
  );
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
