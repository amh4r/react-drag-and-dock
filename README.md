# React Drag and Drop

Create free-floating panels that "snap" into designated targets.

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

# API

## `<DragAndDock.Provider>`

-   `Targets` and `Panels` must be decendents of the `Provider`.
-   But they don't need to be _direct_ descendents.

## `<DragAndDock.Panel>`

-   Draggable, free-floating `Panel`.

## `<DragAndDock.Target>`

-   Drop `Targets` for `Panels`.
-   `Panels` "snap" to `Targets`.
