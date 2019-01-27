import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PanelTab from './PanelTab';

const Wrap = styled.div`
  border: 1px solid black;
  display: flex;
`;

class PanelTabs extends Component {
  render() {
    const { activePanelRef, onTabClick, panels } = this.props;
    const tabs = [];

    panels.forEach((panel) => {
      const { props } = panel;
      const isActive = panel.ref === activePanelRef;

      tabs.push(
        <PanelTab key={props.title} isActive={isActive} onClick={() => onTabClick(panel)}>
          {props.title}
        </PanelTab>,
      );
    });

    return <Wrap>{tabs}</Wrap>;
  }
}

PanelTabs.propTypes = {
  activePanelRef: PropTypes.shape({
    current: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
  }),
  onTabClick: PropTypes.func,
  panels: PropTypes.instanceOf(Map).isRequired,
};

PanelTabs.defaultProps = {
  activePanelRef: null,
  onTabClick: () => {},
};

export default PanelTabs;
