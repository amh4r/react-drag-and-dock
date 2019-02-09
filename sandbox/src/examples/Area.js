import React, { Component } from 'react';
import styled from 'styled-components';

import DragAndDock from '../DragAndDock';

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
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <div style={{ height: '10em' }}>yo</div>

        <div style={{ background: 'lightblue', flexGrow: 1 }}>
          <DragAndDock.Area>
            <DragAndDock.Area.LeftDock width={300} />

            <DragAndDock.Area.Center>
              <div style={{ height: '100%', width: '100%' }}>hello</div>
            </DragAndDock.Area.Center>

            <DragAndDock.Area.RightDock width={300} />

            <DragAndDock.Area.Panels>
              <div>Panel 1</div>
              <div>Panel 2</div>
            </DragAndDock.Area.Panels>
          </DragAndDock.Area>
        </div>
      </div>
    );
  }
}

export default Example;
