import React, { Fragment, useRef } from 'react';
import PropTypes from 'prop-types';

import { DockContainer, DockSection } from './styled';
import Context from '../Context';
import Dock from '../Dock';

function AreaDock(props) {
  const {
    components: { DockContainer: RootContainer, ...DockComponents },
    location,
    split,
    tabLocation,
    width,
  } = props;
  const uidRef = useRef(location);
  const uid = uidRef.current;
  const Container = RootContainer || DockContainer;
  return (
    <Context.Consumer>
      {(context) => {
        const { docks } = context;
        const dock = docks.get(uid);
        const hasPanels = dock && dock.panels.size > 0;
        const isOver = dock && dock.hoverSection === 'over';
        const isTopOver = dock && dock.hoverSection === 'top';
        const isBottomOver = dock && dock.hoverSection === 'bottom';

        return (
          <Dock uid={uid} split={split} tabLocation={tabLocation} components={DockComponents}>
            <Container hasPanels={hasPanels} location={location} width={width} isOver={isOver}>
              {split && (
                <Fragment>
                  <DockSection isOver={isTopOver} />
                  <DockSection isOver={isBottomOver} />
                </Fragment>
              )}
            </Container>
          </Dock>
        );
      }}
    </Context.Consumer>
  );
}

AreaDock.propTypes = {
  components: PropTypes.shape({
    DockContainer: PropTypes.func,
    TabsContainer: PropTypes.func,
    TabComponent: PropTypes.func,
  }),
  location: PropTypes.oneOf(['left', 'right']).isRequired,
  split: PropTypes.bool,
  tabLocation: PropTypes.oneOf(['bottom', 'top']),
  width: PropTypes.number,
};

AreaDock.defaultProps = {
  components: {},
  width: null,
  split: true,
};

export default AreaDock;
