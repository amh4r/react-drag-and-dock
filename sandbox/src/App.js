import React, { Component } from 'react';
// import DragAndDock from 'react-drag-and-dock';

import DragAndDock from './DragAndDock';
// import DragAndDock from './src';
import { Wrap } from './styles';
import Timer from './components/Timer';

class App extends Component {
  render() {
    return (
      <Wrap style={{ height: '80vh' }}>
        <DragAndDock.Provider>
          <DragAndDock.Dock id="dock-1">
            <div style={{ background: '#ddd', flexGrow: 2 }}>Left dock</div>
          </DragAndDock.Dock>

          <div style={{ flexGrow: 3 }} />

          <DragAndDock.Dock>
            <div style={{ background: '#ddd', flexGrow: 1 }}>Right dock</div>
          </DragAndDock.Dock>

          <DragAndDock.Panel title="Panel 1">
            <Timer />
          </DragAndDock.Panel>

          <DragAndDock.Panel
            initialDockId="dock-1"
            title="Panel 2"
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
