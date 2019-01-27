import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  background: transparent;
  border: 0;
  border-right: 1px solid black;
  cursor: pointer;
  padding: 0.2em;
  font-size: 0.8em;

  &.active {
    background: #cce4fe;
  }
`;

class PanelTab extends Component {
  render() {
    const { children, isActive, onClick } = this.props;
    const className = isActive ? 'active' : '';

    return (
      <Button className={className} onClick={onClick}>
        {children}
      </Button>
    );
  }
}

PanelTab.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

PanelTab.defaultProps = {
  isActive: false,
  onClick: () => {},
};

export default PanelTab;
