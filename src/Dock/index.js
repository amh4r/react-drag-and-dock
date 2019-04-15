import React, { Fragment, useLayoutEffect, useRef } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';

import withContext from '../withContext';
import PanelTabs from './PanelTabs';

function Dock(props) {
  const { children, components, context, split, tabLocation, uid: propsUid } = props;
  const ref = useRef(null);
  const uidRef = useRef(propsUid);
  let uid = uidRef.current;

  useLayoutEffect(() => {
    uid = context.registerDock(uid, {
      props,
      ref,
      hover,
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

  function hover(mouseEvent) {
    const dock = getDock();
    const element = dock.ref.current;
    let hoverSection = null;

    const { clientX, clientY } = mouseEvent;
    const { bottom, height, left, right, top } = element.getBoundingClientRect();

    const isMouseInsideX = clientX > left && clientX < right;
    const isMouseInsideY = clientY > top && clientY < bottom;
    const isOver = isMouseInsideX && isMouseInsideY;

    if (isOver) {
      hoverSection = 'over';
      if (split && dock.panels.size === 1) {
        const halfHeight = height / 2;
        const maxRange = halfHeight - 60;
        if (clientY - top <= maxRange) {
          hoverSection = 'top';
        } else if (
          bottom - clientY <= maxRange ||
          (clientY >= halfHeight && clientY <= halfHeight + dock.panelTabsHeight)
        ) {
          hoverSection = 'bottom';
        }
      }
    }

    return { isOver, hoverSection };
  }

  function getDock() {
    const dock = context.provider.docks.get(uid);

    return dock;
  }

  function getPanels() {
    const dock = getDock();

    if (!dock) return new Map();

    return dock.panels;
  }

  function handleTabClick(panelUid) {
    const { setDockActivePanel } = context;

    setDockActivePanel(uid, panelUid);
  }

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
      y:
        dockRect.y +
        window.scrollY +
        (tabLocation === 'bottom' ? dockRect.height - dock.panelTabsHeight + 2 : 0),
    };
  })();

  const width = dockRect ? dockRect.width - 2 : null;

  return (
    <Fragment>
      {arePanelTabsVisible && (
        <PanelTabs
          activePanelUid={activePanelUid}
          components={components}
          dockRef={ref}
          height={dock.panelTabsHeight + 1}
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
  components: PropTypes.shape({
    TabsContainer: PropTypes.func,
    TabComponent: PropTypes.func,
  }),
  context: PropTypes.shape({
    docks: PropTypes.instanceOf(Map).isRequired,
    panels: PropTypes.instanceOf(Map).isRequired,
    registerDock: PropTypes.func.isRequired,
    registerPanel: PropTypes.func.isRequired,
    snapPanelToDock: PropTypes.func.isRequired,
  }).isRequired,
  split: PropTypes.bool,
  tabLocation: PropTypes.oneOf(['bottom', 'top']),
  uid: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
};

Dock.defaultProps = {
  uid: null,
  tabLocation: 'top',
  split: true,
};

export default withContext(Dock);
