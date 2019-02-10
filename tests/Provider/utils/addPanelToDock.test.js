import { addPanelToDock, registerDock, registerPanel } from '../../../src/Provider/utils';

it('Add 1 panel', () => {
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

  const dock = docks.get('dock-1');

  expect(dock.panels.size).toBe(1);
  expect(dock.arePanelTabsVisible).toBe(false);
  expect(dock.activePanelUid).toBe('panel-1');
});

it('Add 2 panels', () => {
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

  const dock = docks.get('dock-1');

  expect(dock.panels.size).toBe(2);
  expect(dock.arePanelTabsVisible).toBe(true);
  expect(dock.activePanelUid).toBe('panel-2');
});

describe('Throw error', () => {
  let docks;
  let panels;

  beforeEach(() => {
    docks = new Map();
    panels = new Map();
  });

  it('on non-existent dock', () => {
    panels = registerPanel({ data: {}, panels, panelUid: 'panel-1' });

    expect(() => {
      ({ newDocks: docks, newPanels: panels } = addPanelToDock({
        docks,
        dockUid: 'dock-1',
        panels,
        panelUid: 'panel-1',
      }));
    }).toThrow();
  });

  it('on non-existent panel', () => {
    docks = registerDock({ data: {}, docks, dockUid: 'dock-1' });

    expect(() => {
      addPanelToDock({
        docks,
        dockUid: 'dock-1',
        panels,
        panelUid: 'panel-1',
      });
    }).toThrow();
  });

  it('on invalid arguments', () => {
    expect(() => {
      addPanelToDock({
        docks: null,
        dockUid: 'dock-1',
        panels,
        panelUid: 'panel-1',
      });
    }).toThrow();

    expect(() => {
      addPanelToDock({
        docks,
        dockUid: null,
        panels,
        panelUid: 'panel-1',
      });
    }).toThrow();

    expect(() => {
      addPanelToDock({
        docks,
        dockUid: 'dock-1',
        panels: null,
        panelUid: 'panel-1',
      });
    }).toThrow();

    expect(() => {
      addPanelToDock({
        docks,
        dockUid: 'dock-1',
        panels,
        panelUid: null,
      });
    }).toThrow();
  });
});
