import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PanelTab from './PanelTab';

const Wrap = styled.div`
  border: 1px solid #3a89ea;
  border-bottom: 0;
  display: flex;
  height: 20px;
`;

class PanelTabs extends Component {
  render() {
    const { activePanelRef, dockRef, onTabClick, panels } = this.props;
    const tabs = [];
    const { left, top, width } = dockRef.current.getBoundingClientRect();

    const style = {
      boxSizing: 'border-box',
      left,
      top,
      position: 'fixed',
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

    return <Wrap style={style}>{tabs}</Wrap>;
  }
}

PanelTabs.propTypes = {
  activePanelRef: PropTypes.shape({
    current: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
  }),
  dockRef: PropTypes.shape({
    current: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
  }),
  onTabClick: PropTypes.func,
  panels: PropTypes.instanceOf(Map).isRequired,
};

PanelTabs.defaultProps = {
  activePanelRef: null,
  dockRef: null,
  onTabClick: () => {},
};

export default PanelTabs;
