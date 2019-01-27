# React Drag and Dock

Create free-floating panels that "dock" into designated targets. Panel docking does not cause its children to remount.

[CodePen Demo](https://codepen.io/goodoldneon/pen/WPraLE)

# Install

`npm i react-drag-and-dock`

# Examples

## Two targets and one panel

```jsx
import React from 'react';
import DragAndDock from 'react-drag-and-dock';

const Foo = () => {
    return (
        <div style={{ display: 'flex', height: '80vh' }}>
            <DragAndDock.Provider>
                <DragAndDock.Target>
                    <div style={{ background: '#ddd', flexGrow: 2 }}>Left target</div>
                </DragAndDock.Target>

                <div style={{ flexGrow: 3 }} />

                <DragAndDock.Target>
                    <div style={{ background: '#ddd', flexGrow: 1 }}>Right target</div>
                </DragAndDock.Target>

                <DragAndDock.Panel title="Panel">
                    <div>Drag me into a target.</div>
                </DragAndDock.Panel>
            </DragAndDock.Provider>
        </div>
    );
};

export default Foo;
```

## Start docked in target

Give the `Target` an `id`, and then set `initialDockTargetId` on the `Panel` to the same value.

```jsx
import React from 'react';
import DragAndDock from 'react-drag-and-dock';

const Foo = () => {
    return (
        <div>
            <DragAndDock.Provider>
                <DragAndDock.Target id="target-1">
                    <div style={{ background: '#ddd', height: '80vh' }}>
                        Left target
                    </div>
                </DragAndDock.Target>

                <DragAndDock.Panel initialDockTargetId="target-1" title="Panel">
                    <div>yo</div>
                </DragAndDock.Panel>
            </DragAndDock.Provider>
        </div>
    );
};

export default Foo;
```

# API

## `<DragAndDock.Provider>`

-   `Targets` and `Panels` must be decendents of the `Provider`.
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
          <td>initialDockTargetId</td>
          <td>string</td>
          <th><code>null</code></th>
          <td>Dock to `Target` whose `id` matches.</td>
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

## `<DragAndDock.Target>`

-   Drop `Targets` for `Panels`.
-   `Panels` "dock" into `Targets`.

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
          <td>Only used for <code>initialDockTargetId</code> prop in <code>Panel</code>.</td>
      </tr>
    </tbody>
</table>

# Development

1. Run `npm start` to watch the `src` files and launch the sandbox server at http://localhost:3010.
2. Change source code in `src` folder.
3. Change sandbox code in `sandbox/src` folder.