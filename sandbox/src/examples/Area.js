import React, { Component } from 'react';

import DragAndDock from '../DragAndDock';
import Timer from '../components/Timer';

class Example extends Component {
  render() {
    return (
      <div
        style={{
          background: 'lightblue',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <DragAndDock.Area>
          <DragAndDock.Area.Center>
            <div style={{ height: '100%', width: '100%' }}>hello</div>
          </DragAndDock.Area.Center>

          <DragAndDock.Area.Dock location="left" width={300} />
          <DragAndDock.Area.Dock location="right" width={300} />

          <DragAndDock.Area.Panel title="Panel 1" initialDockUid="left">
            <div>I am panel 1</div>
          </DragAndDock.Area.Panel>

          <DragAndDock.Area.Panel title="Panel 2">
            <Timer />
          </DragAndDock.Area.Panel>
        </DragAndDock.Area>
      </div>
    );
  }
}

export default Example;
