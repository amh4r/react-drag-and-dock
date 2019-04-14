import addPanelToDock from './addPanelToDock';
import changeDockActivePanel from './changeDockActivePanel';
import getPanelDimensions from './getPanelDimensions';
import movePanelToTopOfStack from './movePanelToTopOfStack';
import previewPanelOnDock from './previewPanelOnDock';
import registerDock from './registerDock';
import registerPanel from './registerPanel';
import removePanelFromDocks from './removePanelFromDocks';
import snapPanelToDock from './snapPanelToDock';
import snapPanelToDockSection from './snapPanelToDockSection';
import unregisterDock from './unregisterDock';
import unregisterPanel from './unregisterPanel';
import updateDock from './updateDock';
import updatePanel from './updatePanel';

export {
  addPanelToDock,
  changeDockActivePanel,
  getPanelDimensions,
  movePanelToTopOfStack,
  previewPanelOnDock,
  registerDock,
  registerPanel,
  removePanelFromDocks,
  snapPanelToDock,
  snapPanelToDockSection,
  unregisterDock,
  unregisterPanel,
  updateDock,
  updatePanel,
};

export default {
  addPanelToDock,
  changeDockActivePanel,
  getPanelDimensions,
  movePanelToTopOfStack,
  previewPanelOnDock,
  registerDock,
  registerPanel,
  removePanelFromDocks,
  snapPanelToDock,
  snapPanelToDockPosition: snapPanelToDockSection,
  unregisterDock,
  unregisterPanel,
  updateDock,
  updatePanel,
};
