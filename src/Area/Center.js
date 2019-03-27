import React from 'react';
import PropTypes from 'prop-types';

function Center(props) {
  const { children } = props;

  return <div style={{ flexGrow: 1 }}>{children}</div>;
}

Center.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Center;
