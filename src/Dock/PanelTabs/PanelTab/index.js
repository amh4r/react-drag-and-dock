import React from 'react';
import PropTypes from 'prop-types';

import { Button } from './styles';

function PanelTab(props) {
  const { children, component, isActive, onClick } = props;
  const className = isActive ? 'active' : '';
  const title = typeof children === 'string' ? children : '';
  const ButtonComponent = component || Button;
  return (
    <ButtonComponent className={className} isActive={isActive} onClick={onClick} title={title}>
      {children}
    </ButtonComponent>
  );
}

PanelTab.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  component: PropTypes.func,
};

PanelTab.defaultProps = {
  isActive: false,
  onClick: () => {},
};

export default PanelTab;
