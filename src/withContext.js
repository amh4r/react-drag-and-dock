import React from 'react';
import PropTypes from 'prop-types';

import Context from './Context';

function withContext(Component) {
  const ContextConsumerWrapper = (props) => {
    return (
      <Context.Consumer>
        {(context) => {
          return (
            <Component {...props} context={context}>
              {props.children}
            </Component>
          );
        }}
      </Context.Consumer>
    );
  };

  ContextConsumerWrapper.propTypes = {
    children: PropTypes.element,
  };

  ContextConsumerWrapper.defaultProps = {
    children: null,
  };

  return ContextConsumerWrapper;
}

export default withContext;
