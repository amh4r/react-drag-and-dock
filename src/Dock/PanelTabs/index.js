import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import PanelTab from './PanelTab';
import { Wrap } from './styles';

class PanelTabs extends Component {
  render() {
    const { activePanelRef, dockRef, height, onTabClick, panels, width } = this.props;

    if (!dockRef.current) return null;

    const tabs = [];

    const style = {
      background: 'white',
      boxSizing: 'border-box',
      left: 0,
      top: 0,
      position: 'absolute',
      width,
    };

    panels.forEach((panel) => {
      const { props } = panel;
      const isActive = panel.ref === activePanelRef;

      tabs.push(
        <PanelTab key={props.title} isActive={isActive} onClick={() => onTabClick(panel)}>
          {props.title}
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

    return ReactDOM.createPortal(component, dockRef.current);
  }
}

PanelTabs.propTypes = {
  activePanelRef: PropTypes.shape({
    current: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
  }),
  dockRef: PropTypes.shape({
    current: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
  }),
  height: PropTypes.number.isRequired,
  onTabClick: PropTypes.func,
  panels: PropTypes.instanceOf(Map).isRequired,
  width: PropTypes.number.isRequired,
};

PanelTabs.defaultProps = {
  activePanelRef: null,
  dockRef: null,
  onTabClick: () => {},
};

export default PanelTabs;
