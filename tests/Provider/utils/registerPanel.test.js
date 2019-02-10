import { registerPanel } from '../../../src/Provider/utils';

it('Success', () => {
  const panels = new Map();
  const panelUid = 'panel-1';
  const newPanels = registerPanel({ data: {}, panels, panelUid });

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

  it('on falsy arguments', () => {
    expect(() => {
      registerPanel({ data: null, panels, panelUid: 'panel-1' });
    }).toThrow();

    expect(() => {
      registerPanel({ data: {}, panels: null, panelUid: 'panel-1' });
    }).toThrow();

    expect(() => {
      registerPanel({ data: {}, panels, panelUid: null });
    }).toThrow();
  });

  it('on registering same panelUid twice', () => {
    panels = registerPanel({ data: {}, panels, panelUid: 'panel-1' });

    expect(() => {
      registerPanel({ data: {}, panels, panelUid: 'panel-1' });
    }).toThrow();
  });
});
