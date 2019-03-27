import React from 'react';
import PropTypes from 'prop-types';

import { Button } from './styles';

function PanelTab(props) {
  const { children, isActive, onClick } = props;
  const className = isActive ? 'active' : '';

  return (
    <Button className={className} onClick={onClick}>
      {children}
    </Button>
  );
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
