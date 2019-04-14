import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import PanelTab from './PanelTab';
import { Wrap } from './styles';

function PanelTabs(props) {
  const {
    activePanelUid,
    components,
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
    background: 'transparent',
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
      <PanelTab
        component={components.TabComponent}
        key={title}
        isActive={isActive}
        onClick={() => onTabClick(panelUid)}
      >
        {title}
      </PanelTab>,
    );
  });

  const RootContainer = components.TabsContainer || Wrap;

  const component = (
    <RootContainer
      className="clazz"
      style={{
        ...style,
        height,
      }}
    >
      {tabs}
    </RootContainer>
  );

  return ReactDOM.createPortal(component, portalTargetRef.current);
}

PanelTabs.propTypes = {
  activePanelUid: PropTypes.string,
  components: PropTypes.shape({
    TabsContainer: PropTypes.func,
    TabComponent: PropTypes.func,
  }),
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
  components: {},
  dockRef: null,
  onTabClick: () => {},
  position: null,
};

export default PanelTabs;
