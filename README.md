# React Drag and Dock

Create free-floating panels that "dock" into designated docks. Panel docking does not cause its children to remount.

[CodePen Demo](https://codepen.io/goodoldneon/pen/WPraLE)

# Install

`npm i react-drag-and-dock`

# Examples

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

Give the `Dock` an `id`, and then set `initialDockId` on the `Panel` to the same value.

```jsx
import React from 'react';
import DragAndDock from 'react-drag-and-dock';

const App = () => {
    return (
        <div>
            <DragAndDock.Provider>
                <DragAndDock.Dock id="dock-1">
                    <div style={{ background: '#ddd', height: '80vh', width: '50vw' }}>
                        I am a dock
                    </div>
                </DragAndDock.Dock>

                <DragAndDock.Panel initialDockId="dock-1" title="Panel">
                    <div>yo</div>
                </DragAndDock.Panel>
            </DragAndDock.Provider>
        </div>
    );
};
```

# API

## `<DragAndDock.Provider>`

-   `Docks` and `Panels` must be decendents of the `Provider`.
-   But they don't need to be _direct_ descendents.

## `<DragAndDock.Panel>`

-   Draggable, free-floating `Panel`.

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
          <td>initialDockId</td>
          <td>string</td>
          <th><code>null</code></th>
          <td>Dock to `Dock` whose `id` matches.</td>
      </tr>
      <tr>
        <td>styles</td>
        <td>object</td>
        <th><code>{}</code></th>
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
          <th><code>"Panel"</code></th>
          <td>Text which appears in the handle at the top.</td>
      </tr>
    </tbody>
</table>

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
          <td>id</td>
          <td>string</td>
          <th><code>null</code></th>
          <td>Only used for <code>initialDockId</code> prop in <code>Panel</code>.</td>
      </tr>
    </tbody>
</table>

# Development

1. Run `npm start` to watch the `src` files and launch the sandbox server at http://localhost:3010.
2. Change source code in `src` folder.
3. Change sandbox code in `sandbox/src` folder.
    - Don't edit the files in `sandbox/src/DragAndDock`. The `src` folder is copied into in on change.
