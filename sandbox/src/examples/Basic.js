import React, { Component } from 'react';
// import DragAndDock from 'react-drag-and-dock';
import styled from 'styled-components';

import DragAndDock from '../DragAndDock';
// import Timer from '../components/Timer';

const Wrap = styled.div`
  display: grid;
  grid-template-columns: 3fr 4fr 2fr;
  font-family: 'Segoe UI', 'Segoe UI Web (West European)', 'Segoe UI', -apple-system,
    BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif;
  font-weight: 200;
  text-align: center;
  width: 100%;
`;

class Example extends Component {
  render() {
    return (
      <div>
        <div style={{ height: '10em' }}>yo</div>
        <DragAndDock.Provider>
          <Wrap style={{ height: '140vh', position: 'relative' }}>
            <DragAndDock.Dock uid="dock-1">
              <div style={{ background: '#D0E4FB', height: '100%' }}>I am a dock</div>
            </DragAndDock.Dock>

            <div />

            <DragAndDock.Dock>
              <div style={{ background: '#D0E4FB', height: '100%' }}>I am a dock</div>
            </DragAndDock.Dock>

            <DragAndDock.Panel
              title="Panel 1"
              defaultHeight={100}
              defaultWidth={300}
              defaultPosition={{ x: 300, y: 100 }}
            >
              {/* <Timer /> */}
              <div>Panel 1</div>
            </DragAndDock.Panel>

            <DragAndDock.Panel initialDockId="dock-1" title="Panel 2">
              {/* <Timer /> */}
              <div>Panel 2</div>
            </DragAndDock.Panel>

            <DragAndDock.Panel initialDockId="dock-1" title="Panel 3">
              <div>Panel 3</div>
            </DragAndDock.Panel>
          </Wrap>
        </DragAndDock.Provider>
      </div>
    );
  }
}

export default Example;
