import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Context from '../Context';
import DockablePanel from './DockablePanel';

class DockablePanelContainer extends Component {
  render() {
    const { children } = this.props;

    return (
      <Context.Consumer>
        {(context) => {
          return (
            <DockablePanel {...this.props} context={context}>
              {children}
            </DockablePanel>
          );
        }}
      </Context.Consumer>
    );
  }
}

DockablePanelContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default DockablePanelContainer;
