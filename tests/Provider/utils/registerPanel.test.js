import { registerPanel } from '../../../src/Provider/utils';

it('Success', () => {
  const data = {};
  const panels = new Map();
  const panelUid = 'panel-1';
  const newPanels = registerPanel({ data, panels, panelUid });

  expect(newPanels.size).toEqual(1);

  const panel = newPanels.get(panelUid);

  expect(panel).toEqual({
    dimensions: { height: null, width: null, x: null, y: null },
    isVisible: true,
    snappedDockUid: null,
  });
});

describe('Throw error', () => {
  let panels;

  beforeEach(() => {
    panels = new Map();
  });

  it('on falsy data', () => {
    expect(() => {
      const data = null;
      const panelUid = 'panel-1';

      registerPanel({ data, panels, panelUid });
    }).toThrow();
  });

  it('on falsy docks', () => {
    expect(() => {
      const data = {};
      const panelUid = 'panel-1';
      panels = null;

      registerPanel({ data, panels, panelUid });
    }).toThrow();
  });

  it('on falsy panelUid', () => {
    expect(() => {
      const data = {};
      const panelUid = null;

      registerPanel({ data, panels, panelUid });
    }).toThrow();
  });
});
