import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import PanelTab from './PanelTab';
import { Wrap } from './styles';

const _pixelToNumber = (str) => {
  if (!str.endsWith('px')) return null;

  return Number.parseInt(str, 10);
};

const _getPositionRelativeToBody = (dockRef) => {
  const {
    height: dockHeight,
    width: dockWidth,
    left: dockLeft,
    top: dockTop,
  } = dockRef.current.getBoundingClientRect();

  const { left: bodyLeft, top: bodyTop } = document.body.getBoundingClientRect();
  const bodyStyle = window.getComputedStyle(document.body);
  const marginLeft = _pixelToNumber(bodyStyle.marginLeft);
  const marginTop = _pixelToNumber(bodyStyle.marginTop);

  return {
    dockHeight,
    width: dockWidth,
    left: dockLeft - bodyLeft + marginLeft,
    top: dockTop - bodyTop + marginTop,
  };
};

class PanelTabs extends Component {
  render() {
    const { activePanelRef, dockRef, height, onTabClick, panels } = this.props;

    if (!dockRef.current) return null;

    const tabs = [];
    const { left, top, width } = _getPositionRelativeToBody(dockRef);

    const style = {
      boxSizing: 'border-box',
      float: 'left',
      left,
      top,
      position: 'absolute',
      width,
    };

    panels.forEach((panel) => {
      const { props } = panel;
      const isActive = panel.ref === activePanelRef;

      tabs.push(
        <PanelTab key={props.title} isActive={isActive} onClick={() => onTabClick(panel)}>
          {props.title}
        </PanelTab>,
      );
    });

    const component = (
      <Wrap
        style={{
          ...style,
          height,
        }}
      >
        {tabs}
      </Wrap>
    );

    return ReactDOM.createPortal(component, document.body);
  }
}

PanelTabs.propTypes = {
  activePanelRef: PropTypes.shape({
    current: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
  }),
  dockRef: PropTypes.shape({
    current: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
  }),
  height: PropTypes.number.isRequired,
  onTabClick: PropTypes.func,
  panels: PropTypes.instanceOf(Map).isRequired,
};

PanelTabs.defaultProps = {
  activePanelRef: null,
  dockRef: null,
  onTabClick: () => {},
};

export default PanelTabs;
