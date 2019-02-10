import { registerPanel } from '../../../src/Provider/utils';

it('Register 1 panel', () => {
  let panels = new Map();

  panels = registerPanel({ data: {}, panels, panelUid: 'panel-1' });
  expect(panels.size).toEqual(1);

  const panel = panels.get('panel-1');

  expect(panel).toEqual({
    dimensions: { height: null, width: null, x: null, y: null },
    isVisible: true,
    snappedDockUid: null,
    zIndex: 1,
  });
});

it('Register 2 panels', () => {
  let panels = new Map();

  panels = registerPanel({ data: {}, panels, panelUid: 'panel-1' });
  panels = registerPanel({ data: {}, panels, panelUid: 'panel-2' });
  expect(panels.size).toEqual(2);

  let panel = panels.get('panel-1');

  expect(panel).toEqual({
    dimensions: { height: null, width: null, x: null, y: null },
    isVisible: true,
    snappedDockUid: null,
    zIndex: 1,
  });

  panel = panels.get('panel-2');

  expect(panel).toEqual({
    dimensions: { height: null, width: null, x: null, y: null },
    isVisible: true,
    snappedDockUid: null,
    zIndex: 2,
  });
});

it('Does not mutate arguments', () => {
  const panels = new Map();

  registerPanel({ data: {}, panels, panelUid: 'panel-1' });
  expect(panels.size).toEqual(0);
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
