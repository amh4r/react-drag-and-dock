import React from 'react';
import PropTypes from 'prop-types';

import withContext from '../withContext';

class PanelSurrogate extends React.Component {
  ref = React.createRef();

  componentDidMount() {
    const { context, uid } = this.props;

    context.registerPanel(uid, {
      props: this.props,
      ref: this.ref,
      renderContents: this.renderContents,
    });
  }

  render() {
    return null;
  }
}

PanelSurrogate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  context: PropTypes.shape({
    docks: PropTypes.instanceOf(Map).isRequired,
    panels: PropTypes.instanceOf(Map).isRequired,
    registerDock: PropTypes.func.isRequired,
    registerPanel: PropTypes.func.isRequired,
    snapPanelToDock: PropTypes.func.isRequired,
  }).isRequired,
  defaultHeight: PropTypes.number,
  defaultPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  defaultWidth: PropTypes.number,
  initialDockUid: PropTypes.string,
  styles: PropTypes.shape({
    handle: PropTypes.object,
    root: PropTypes.object,
  }),
  title: PropTypes.string,
  uid: PropTypes.string,
};

PanelSurrogate.defaultProps = {
  defaultHeight: null,
  defaultWidth: null,
  defaultPosition: undefined,
  initialDockUid: null,
  styles: {},
  title: 'Panel',
  uid: null,
};

export default withContext(PanelSurrogate);
