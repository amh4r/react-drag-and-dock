import React, { Component } from 'react';
// import DragAndDock from 'react-drag-and-dock';
import styled from 'styled-components';

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
          <div style={{ background: '#ddd', flexGrow: 2 }}>
            <DragAndDock.Dock id="dock-1" />
          </div>

          <div style={{ flexGrow: 3 }} />

          <div style={{ background: '#ddd', flexGrow: 1 }}>
            <DragAndDock.Dock />
          </div>

          <DragAndDock.Panel title="Panel 1">
            <Timer />
          </DragAndDock.Panel>

          <DragAndDock.Panel initialDockId="dock-1" title="Panel 2">
            <Timer />
          </DragAndDock.Panel>

          <DragAndDock.Panel
            initialDockId="dock-1"
            title="Panel 3"
            styles={{
              handle: {
                background: '#CCE4FE',
              },
              root: {
                background: '#fcfcfc',
                border: '1px solid #b8daff',
              },
            }}
          >
            <div>yo</div>
          </DragAndDock.Panel>
        </DragAndDock.Provider>
      </Wrap>
    );
  }
}

export default App;
