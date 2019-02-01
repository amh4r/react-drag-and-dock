import React, { Component } from 'react';
// import DragAndDock from 'react-drag-and-dock';
import styled from 'styled-components';

import './app.css';
import DragAndDock from './DragAndDock';
import Timer from './components/Timer';

const Wrap = styled.div`
  display: grid;
  grid-template-columns: 3fr 4fr 2fr;
  font-family: 'Segoe UI', 'Segoe UI Web (West European)', 'Segoe UI', -apple-system,
    BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif;
  font-weight: 200;
  text-align: center;
  width: 100%;
`;

class App extends Component {
  render() {
    return (
      <DragAndDock.Provider>
        {/* <Wrap style={{ height: '140vh', position: 'relative' }}> */}
        <Wrap style={{ height: '140vh' }}>
          <DragAndDock.Dock id="dock-1">
            <div style={{ background: '#D0E4FB', height: '100%' }}>I am a dock</div>
          </DragAndDock.Dock>

          <div />

          <DragAndDock.Dock>
            <div style={{ background: '#D0E4FB', height: '100%' }}>I am a dock</div>
          </DragAndDock.Dock>

          <DragAndDock.Panel title="Panel 1">
            <Timer />
          </DragAndDock.Panel>

          <DragAndDock.Panel initialDockId="dock-1" title="Panel 2">
            <Timer />
          </DragAndDock.Panel>

          <DragAndDock.Panel initialDockId="dock-1" title="Panel 3">
            <div>yo</div>
          </DragAndDock.Panel>
        </Wrap>
      </DragAndDock.Provider>
    );
  }
}

export default App;
