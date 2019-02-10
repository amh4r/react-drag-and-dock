import {
  addPanelToDock,
  registerDock,
  registerPanel,
  removePanelFromDocks,
} from '../../../src/Provider/utils';

it('Add 1 panel and remove 1 panel', () => {
  let docks = new Map();
  let panels = new Map();

  docks = registerDock({ data: {}, docks, dockUid: 'dock-1' });
  panels = registerPanel({ data: {}, panels, panelUid: 'panel-1' });

  ({ newDocks: docks, newPanels: panels } = addPanelToDock({
    docks,
    dockUid: 'dock-1',
    panels,
    panelUid: 'panel-1',
  }));

  ({ newDocks: docks, newPanels: panels } = removePanelFromDocks({
    docks,
    panels,
    panelUid: 'panel-1',
  }));

  const dock = docks.get('dock-1');

  expect(dock.panels.size).toBe(0);
  expect(dock.arePanelTabsVisible).toBe(false);
  expect(dock.activePanelUid).toBe(null);
});

it('Add 2 panels and remove 2 panels', () => {
  let docks = new Map();
  let panels = new Map();

  docks = registerDock({ data: {}, docks, dockUid: 'dock-1' });
  panels = registerPanel({ data: {}, panels, panelUid: 'panel-1' });
  panels = registerPanel({ data: {}, panels, panelUid: 'panel-2' });

  ({ newDocks: docks, newPanels: panels } = addPanelToDock({
    docks,
    dockUid: 'dock-1',
    panels,
    panelUid: 'panel-1',
  }));

  ({ newDocks: docks, newPanels: panels } = addPanelToDock({
    docks,
    dockUid: 'dock-1',
    panels,
    panelUid: 'panel-2',
  }));

  ({ newDocks: docks, newPanels: panels } = removePanelFromDocks({
    docks,
    panels,
    panelUid: 'panel-1',
  }));

  ({ newDocks: docks, newPanels: panels } = removePanelFromDocks({
    docks,
    panels,
    panelUid: 'panel-2',
  }));

  const dock = docks.get('dock-1');

  expect(dock.panels.size).toBe(0);
  expect(dock.arePanelTabsVisible).toBe(false);
  expect(dock.activePanelUid).toBe(null);
});

it('Add 2 panels and remove 1 panel', () => {
  let docks = new Map();
  let panels = new Map();

  docks = registerDock({ data: {}, docks, dockUid: 'dock-1' });
  panels = registerPanel({ data: {}, panels, panelUid: 'panel-1' });
  panels = registerPanel({ data: {}, panels, panelUid: 'panel-2' });

  ({ newDocks: docks, newPanels: panels } = addPanelToDock({
    docks,
    dockUid: 'dock-1',
    panels,
    panelUid: 'panel-1',
  }));

  ({ newDocks: docks, newPanels: panels } = addPanelToDock({
    docks,
    dockUid: 'dock-1',
    panels,
    panelUid: 'panel-2',
  }));

  ({ newDocks: docks, newPanels: panels } = removePanelFromDocks({
    docks,
    panels,
    panelUid: 'panel-2',
  }));

  const dock = docks.get('dock-1');

  expect(dock.panels.size).toBe(1);
  expect(dock.arePanelTabsVisible).toBe(false);
  expect(dock.activePanelUid).toBe('panel-1');
});

describe('Throw error', () => {
  let docks;
  let panels;

  beforeEach(() => {
    docks = new Map();
    panels = new Map();
    docks = registerDock({ data: {}, docks, dockUid: 'dock-1' });
    panels = registerPanel({ data: {}, panels, panelUid: 'panel-1' });
  });

  it('on invalid arguments', () => {
    expect(() => {
      removePanelFromDocks({
        docks: null,
        panels,
        panelUid: 'panel-1',
      });
    }).toThrow();

    expect(() => {
      removePanelFromDocks({
        docks: {},
        panels: null,
        panelUid: 'panel-1',
      });
    }).toThrow();

    expect(() => {
      removePanelFromDocks({
        docks: {},
        panels,
        panelUid: null,
      });
    }).toThrow();
  });
});
