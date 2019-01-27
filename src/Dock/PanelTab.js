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
`;

class PanelTab extends Component {
  render() {
    const { children, onClick } = this.props;

    return <Button onClick={onClick}>{children}</Button>;
  }
}

PanelTab.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  onClick: PropTypes.func,
};

PanelTab.defaultProps = {
  onClick: () => {},
};

export default PanelTab;
