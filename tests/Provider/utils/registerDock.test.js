import { registerDock } from '../../../src/Provider/utils';

it('Success', () => {
  const docks = new Map();
  const dockUid = 'dock-1';
  const newDocks = registerDock({ data: {}, docks, dockUid });

  expect(newDocks.size).toEqual(1);

  const dock = newDocks.get(dockUid);

  expect(dock).toEqual({
    arePanelTabsVisible: false,
    panels: new Map(),
    panelTabsHeight: 20,
  });
});

describe('Throw error', () => {
  let docks;

  beforeEach(() => {
    docks = new Map();
  });

  it('on invalid arguments', () => {
    expect(() => {
      registerDock({ data: null, docks, dockUid: 'dock-1' });
    }).toThrow();

    expect(() => {
      registerDock({ data: {}, docks: null, dockUid: 'dock-1' });
    }).toThrow();

    expect(() => {
      registerDock({ data: {}, docks, dockUid: null });
    }).toThrow();
  });

  it('on registering same dockUid twice', () => {
    docks = registerDock({ data: {}, docks, dockUid: 'dock-1' });

    expect(() => {
      registerDock({ data: {}, docks, dockUid: 'dock-1' });
    }).toThrow();
  });
});
