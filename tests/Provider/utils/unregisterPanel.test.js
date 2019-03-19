import {
  registerDock,
  registerPanel,
  snapPanelToDock,
  unregisterPanel,
} from '../../../src/Provider/utils';

describe('Unregister panel', () => {
  let docks;
  let panels;

  beforeEach(() => {
    docks = new Map();
    docks = registerDock({ data: {}, docks, dockUid: 'dock-1' });
    panels = new Map();
    panels = registerPanel({ data: {}, panels, panelUid: 'panel-1' });
  });

  it('removes the panel from panels', () => {
    ({ newPanels: panels } = unregisterPanel({ docks, panels, panelUid: 'panel-1' }));
    expect(panels.size).toEqual(0);
  });

  it('removes the panel tab from dock', () => {
    ({ newDocks: docks, newPanels: panels } = snapPanelToDock({
      docks,
      dockUid: 'dock-1',
      panels,
      panelUid: 'panel-1',
      shouldHandleDimensions: false,
    }));

    expect(docks.get('dock-1').panels.size).toBe(1);

    ({ newDocks: docks, newPanels: panels } = unregisterPanel({
      docks,
      panels,
      panelUid: 'panel-1',
    }));

    expect(docks.get('dock-1').panels.size).toBe(0);
  });

  it(`throws error when the panelUid isn't already registered`, () => {
    expect(() => {
      unregisterPanel('panel-foo');
    }).toThrow(TypeError);
  });
});
