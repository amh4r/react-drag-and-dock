import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Center extends Component {
  render() {
    const { children } = this.props;

    return <div style={{ flexGrow: 1 }}>{children}</div>;
  }
}

Center.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Center;
