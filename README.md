# React Drag and Dock

Create free-floating panels that "dock" into designated docks. Panel docking does not cause its children to remount.

# Contents

-   [Demos](#demos)
-   [Install](#install)
-   [How It Works](#how-it-works)
-   [Examples](#examples)
-   [API](#api)
-   [Development](#development)

# Demos

[Dock area](https://codepen.io/goodoldneon/pen/mvxVom)

[Custom layout](https://codepen.io/goodoldneon/pen/WPraLE)

# Install

`npm i react-drag-and-dock`

# How It Works

When a `Panel` docked, the position of the `Dock` is determined using [`Element.getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect). Then the `Panel` height, width, and position are changed. All positions are relative to `document.body`.

To the user, the `Panel` appears to be inside the `Dock`. In reality, the `Panel` is actually on top of the `Dock`.

# Examples

## Dock area

Dock areas are a simple, opinionated way to create a layout with docks.

```jsx
import React, { Component } from 'react';
import DragAndDock from 'react-drag-and-dock';

const App = () => {
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

          <DragAndDock.Area.Panel title="Panel 2" defaultPosition={{ x: 400, y: 100 }}>
            <div>I am panel 2</div>
          </DragAndDock.Area.Panel>
        </DragAndDock.Area>
      </div>
    );
  }
}

export default Example;
```

## Two docks and one panel

```jsx
import React from 'react';
import DragAndDock from 'react-drag-and-dock';

const App = () => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 4fr 2fr', height: '80vh' }}>
            <DragAndDock.Provider>
                <DragAndDock.Dock>
                    <div style={{ background: '#D0E4FB', height: '100%' }}>I am a dock</div>
                </DragAndDock.Dock>

                <div />

                <DragAndDock.Dock>
                    <div style={{ background: '#D0E4FB', height: '100%' }}>I am a dock</div>
                </DragAndDock.Dock>

                <DragAndDock.Panel title="Panel">
                    <div>Drag me into a dock.</div>
                </DragAndDock.Panel>
            </DragAndDock.Provider>
        </div>
    );
};
```

## Start docked in dock

Give the `Dock` an `id`, and then set `initialDockUid` on the `Panel` to the same value.

```jsx
import React from 'react';
import DragAndDock from 'react-drag-and-dock';

const App = () => {
    return (
        <div>
            <DragAndDock.Provider>
                <DragAndDock.Dock uid="dock-1">
                    <div style={{ background: '#ddd', height: '80vh', width: '50vw' }}>
                        I am a dock
                    </div>
                </DragAndDock.Dock>

                <DragAndDock.Panel initialDockUid="dock-1" title="Panel">
                    <div>yo</div>
                </DragAndDock.Panel>
            </DragAndDock.Provider>
        </div>
    );
};
```

# API

## `<DragAndDock.Area>`

-   Used to create a simple, opinionated dock layout.
-   [Demo](https://codepen.io/goodoldneon/pen/mvxVom)

### `<DragAndDock.Area.Center>`

-   Required.
-   Center content.
-   Not dockable.

### `<DragAndDock.Area.Dock>`

-   Dockable area.

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 50px;">name</th>
        <th style="width: 50px;">type</th>
        <th>default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
      <tr>
          <td>components</td>
          <td>
            object
            <br>
            <code>{DockContainer, TabsContainer, TabComponent}</code>
          </td>
          <td><code>{}</code></td>
          <td>Replace the underlying components. Details below.
          </td>
      </tr>
      <tr>
          <td>location</td>
          <td>string</td>
          <td><code>null</code></td>
          <td>Can only be <code>"left"</code> or <code>"right"</code>.</td>
      </tr>      
      <tr>
          <td>split</td>
          <td>boolean</td>
          <td><code>true</code></td>
          <td>Enable split view in Dock.</td>
      </tr>
      <tr>
          <td>tabLocation</td>
          <td>string</td>
          <td><code>"top"</code></td>
          <td>Can only be <code>"top"</code> or <code>"bottom"</code>.</td>
      </tr>
      <tr>
          <td>width</td>
          <td>number</td>
          <td><code>null</code></td>
          <td>Width in pixels.</td>
      </tr>
    </tbody>
</table>

#### Replacing components

Default components can be replaced by using the `components` property. These components are given all the props they required.

```$js
{
    DockContainer: (props: ({hasPanels, location, width, isOver})) => (),
    TabsContainer: (props: ({style})) => (),
    TabComponent: (props: ({className, isActive, onClick, title})) => (),
}
```

### `<DragAndDock.Area.Dock>`

-   See `<DragAndDock.Panel>`.

## `<DragAndDock.Provider>`

-   `Docks` and `Panels` must be decendents of the `Provider`.
-   But they don't need to be _direct_ descendents.

## `<DragAndDock.Panel>`

-   Draggable, free-floating `Panel`.

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 50px;">name</th>
        <th>type</th>
        <th>default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
      <tr>
          <td>defaultHeight</td>
          <td>number | string</td>
          <td><code>null</code></td>
          <td>Panel height on initial load. Does nothing after the <code>Panel</code> is docked.</td>
      </tr>
      <tr>
          <td>defaultPosition</td>
          <td>
            object
            <br />
            <code>{x:number,y:number}</code>
          </td>
          <td><code>undefined</code></td>
          <td>Position (x and y, relative to <code>body</code>) on initial load. Does nothing after the <code>Panel</code> is docked.</td>
      </tr>
      <tr>
          <td>components</td>
          <td>
            object
            <br />
            <code>{RootContainer, TitleBar, PanelArea}</code>
          </td>
          <td><code>undefined</code></td>
          <td>Components to replace.</td>
      </tr>
      <tr>
          <td>defaultWidth</td>
          <td>number | string</td>
          <td><code>null</code></td>
          <td>Panel width on initial load. Does nothing after the <code>Panel</code> is docked.</td>
      </tr>
      <tr>
          <td>initialDockUid</td>
          <td>string</td>
          <td><code>null</code></td>
          <td>On initial load, which <code>Dock</code> to snap to. Must correspond to the <code>id</code> of an existing <code>Dock</code>.</td>
      </tr>
      <tr>
          <td>initialDockSection</td>
          <td>string</td>
          <td><code>undefined</code></td>
          <td>Can only be <code>"top"</code> or <code>"bottom"</code>. On initial load, which section of <code>Dock</code> to snap to. Dock must support <code>split</code> and should have a panel snapped to it.</td>
      </tr>      
      <tr>
          <td>renderTitleBar</td>
          <td>function</td>
          <td><code>null</code></td>
          <td>
            Render a custom title bar component. Passes an object with the following properties:
            <ul>
                <li><code>draggableClassName</code> -- Put on the element which should be "draggable".
                <li><code>styles</code> -- Style object.
                <li><code>title</code> -- Panel title.
            </ul>
          </td>
      </tr>
      <tr>
        <td>styles</td>
        <td>object</td>
        <td><code>{}</code></td>
        <td>
            Each property is the JSX <code>style</code> prop for a different "part" of the <code>Panel</code>.
            <ul>
                <li><code>handle</code> -- Handle at the top.
                <li><code>root</code> -- Wrapper container.
            </ul>
        </td>
      </tr>
      <tr>
          <td>title</td>
          <td>string</td>
          <td><code>"Panel"</code></td>
          <td>Text which appears in the handle at the top.</td>
      </tr>
    </tbody>
</table>

### Replacing components

Default components can be replaced by using the `components` property. These components are given all the props they required.

```$js
{
    RootContainer: (props: ({isDocked, style})) => (),
    TitleBar: (props: ({draggableClassName, isDocked, style, title})) => (),
    PanelArea: (props: ({children, isDocked, style})) => (),
}
```

## `<DragAndDock.Dock>`

-   `Panels` "dock" into `Docks`.

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 50px;">name</th>
        <th style="width: 50px;">type</th>
        <th>default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
      <tr>
          <td>uid</td>
          <td>string</td>
          <td><code>null</code></td>
          <td>Only used for <code>initialDockUid</code> prop in <code>Panel</code>.</td>
      </tr>
      <tr>
        <td>components</td>
        <td>
          object
          <br>
          <code>{TabsContainer, TabComponent}</code>
        </td>
        <td><code>{}</code></td>
        <td>Replace the underlying components..
        </td>
    </tr>    
    <tr>
        <td>split</td>
        <td>boolean</td>
        <td><code>true</code></td>
        <td>Enable split view in Dock.</td>
    </tr>
    <tr>
        <td>tabLocation</td>
        <td>string</td>
        <td><code>"top"</code></td>
        <td>Can only be <code>"top"</code> or <code>"bottom"</code>.</td>
    </tr>
   </tbody>
</table>
