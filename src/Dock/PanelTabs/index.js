import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import PanelTab from './PanelTab';
import { Wrap } from './styles';

function PanelTabs(props) {
  const {
    activePanelUid,
    dockRef,
    height,
    onTabClick,
    panels,
    portalTargetRef,
    position,
    width,
  } = props;

  if (!dockRef.current || !portalTargetRef.current) return null;

  const tabs = [];

  const style = {
    background: 'white',
    boxSizing: 'border-box',
    left: position ? position.x : null,
    top: position ? position.y : null,
    position: 'absolute',
    width,
  };

  panels.forEach((panel, panelUid) => {
    const { title } = panel.props;
    const isActive = panelUid === activePanelUid;

    tabs.push(
      <PanelTab key={title} isActive={isActive} onClick={() => onTabClick(panelUid)}>
        {title}
      </PanelTab>,
    );
  });

  const component = (
    <Wrap
      style={{
        ...style,
        height,
      }}
    >
      {tabs}
    </Wrap>
  );

  return ReactDOM.createPortal(component, portalTargetRef.current);
}

PanelTabs.propTypes = {
  activePanelUid: PropTypes.string,
  dockRef: PropTypes.shape({
    current: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
  }),
  height: PropTypes.number.isRequired,
  onTabClick: PropTypes.func,
  panels: PropTypes.instanceOf(Map).isRequired,
  portalTargetRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  width: PropTypes.number.isRequired,
};

PanelTabs.defaultProps = {
  activePanelUid: null,
  dockRef: null,
  onTabClick: () => {},
  position: null,
};

export default PanelTabs;
