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
      <Wrap style={{ height: '80vh' }}>
        <DragAndDock.Provider>
          <div style={{ background: '#D0E4FB' }}>
            <DragAndDock.Dock id="dock-1" />
          </div>

          <div />

          <div style={{ background: '#D0E4FB' }}>
            <DragAndDock.Dock />
          </div>

          <DragAndDock.Panel title="Panel 1">
            <Timer />
          </DragAndDock.Panel>

          <DragAndDock.Panel initialDockId="dock-1" title="Panel 2">
            <Timer />
          </DragAndDock.Panel>

          <DragAndDock.Panel initialDockId="dock-1" title="Panel 3">
            <div>yo</div>
          </DragAndDock.Panel>
        </DragAndDock.Provider>
      </Wrap>
    );
  }
}

export default App;
