import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from './styles';

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
