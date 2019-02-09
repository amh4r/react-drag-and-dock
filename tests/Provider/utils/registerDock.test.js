import { registerDock } from '../../../src/Provider/utils';

describe('Success', () => {
  const data = {};
  const docks = new Map();
  const dockUid = 'dock-1';
  const newDocks = registerDock({ data, docks, dockUid });

  expect(newDocks.size).toEqual(1);

  const dock = newDocks.get(dockUid);

  expect(dock).toEqual({
    panels: new Map(),
    arePanelTabsVisible: false,
    panelTabsHeight: 20,
  });
});

describe('Throw error', () => {
  let docks;

  beforeEach(() => {
    docks = new Map();
  });

  it('on falsy data', () => {
    expect(() => {
      const data = null;
      const dockUid = 'dock-1';

      registerDock({ data, docks, dockUid });
    }).toThrow();
  });

  it('on falsy docks', () => {
    expect(() => {
      const data = {};
      const dockUid = 'dock-1';
      docks = null;

      registerDock({ data, docks, dockUid });
    }).toThrow();
  });

  it('on falsy dockUid', () => {
    expect(() => {
      const data = {};
      const dockUid = null;

      registerDock({ data, docks, dockUid });
    }).toThrow();
  });
});
