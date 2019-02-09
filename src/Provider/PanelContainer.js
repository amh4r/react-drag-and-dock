import React from 'react';

import Panel from '../Panel';

const PanelContainer = React.forwardRef((props, ref) => {
  const { panels } = props;
  const panelElems = [];

  panels.forEach((panel, panelUid) => {
    if (!panelUid) return;

    const elem = (
      <Panel
        key={panelUid} // eslint-disable-line react/no-array-index-key
        {...panel.props}
        uid={panelUid}
      />
    );

    panelElems.push(elem);
  });

  return <div ref={ref}>{panelElems}</div>;
});

export default PanelContainer;
