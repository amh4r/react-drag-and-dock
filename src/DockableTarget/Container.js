import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Context from '../Context';
import DockableTarget from './DockableTarget';

class DockableTargetContainer extends Component {
  render() {
    const { children } = this.props;

    return (
      <Context.Consumer>
        {(context) => {
          return (
            <DockableTarget context={context} ref={this.ref}>
              {children}
            </DockableTarget>
          );
        }}
      </Context.Consumer>
    );
  }
}

DockableTargetContainer.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DockableTargetContainer;
