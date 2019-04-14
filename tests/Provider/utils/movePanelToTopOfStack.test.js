import { movePanelToTopOfStack, registerPanel } from '../../../src/Provider/utils';

it('Move panel to top of 2 panels', () => {
  let panels = new Map();

  panels = registerPanel({ data: {}, panels, panelUid: 'panel-1' });
  panels = registerPanel({ data: {}, panels, panelUid: 'panel-2' });
  panels = movePanelToTopOfStack({ panels, panelUid: 'panel-1' });

  let panel = panels.get('panel-1');

  expect(panel.zIndex).toBe(2002);
  panel = panels.get('panel-2');
  expect(panel.zIndex).toBe(2001);
});
