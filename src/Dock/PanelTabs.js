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
    const { onTabClick, panels } = this.props;
    const tabs = [];

    panels.forEach((panel) => {
      const { props } = panel;

      tabs.push(
        <PanelTab key={props.title} onClick={() => onTabClick(panel)}>
          {props.title}
        </PanelTab>,
      );
    });

    return <Wrap>{tabs}</Wrap>;
  }
}

PanelTabs.propTypes = {
  onTabClick: PropTypes.func,
  panels: PropTypes.instanceOf(Map).isRequired,
};

PanelTabs.defaultProps = {
  onTabClick: () => {},
};

export default PanelTabs;
