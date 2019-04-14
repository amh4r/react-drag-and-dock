import { getOtherSection, validateSection } from './dockSections';
import addPanelToDock from './addPanelToDock';
import removePanelFromDocks from './removePanelFromDocks';
import shiftPanelOnDock from './shiftPanelOnDock';
import snapPanelToDock from './snapPanelToDock';
import updatePanel from './updatePanel';
import updateDock from './updateDock';

const snapPanelToDockSection = ({ docks, dockUid, panels, panelUid, dockSection }) => {
  let newDocks = new Map(docks);
  let newPanels = new Map(panels);

  ({ newDocks, newPanels } = removePanelFromDocks({
    docks: newDocks,
    panels: newPanels,
    panelUid,
  }));

  const dock = newDocks.get(dockUid) || null;

  if (dock !== null) {
    let panelTabsVisible = dock.panels.size > 1;
    let shouldSnapToDock = true;

    if (dock.props.split && dock.panels.size === 1) {
      const existingPanelUid = dock.panels.keys().next().value;
      const existingPanel = newPanels.get(existingPanelUid);
      const existingPanelInitialDockSection = existingPanel.props.initialDockSection;

      panelTabsVisible = dockSection === 'over';
      let shiftExistingPanel = true;

      if (!panelTabsVisible) {
        const validDockSection = validateSection(dockSection);
        const validExistingPanelInitialDockSection =
          validateSection(existingPanelInitialDockSection) &&
          existingPanelInitialDockSection !== 'over';

        shiftExistingPanel = !validDockSection && validExistingPanelInitialDockSection;
        panelTabsVisible = !(validDockSection || existingPanelInitialDockSection);
      }

      if (!panelTabsVisible) {
        shouldSnapToDock = false;
        newPanels = shiftPanelOnDock({
          dock,
          panelUid,
          panels: newPanels,
          dockSection: shiftExistingPanel
            ? getOtherSection(existingPanelInitialDockSection)
            : dockSection,
        });

        newPanels = shiftPanelOnDock({
          dock,
          panelUid: existingPanelUid,
          panels: newPanels,
          dockSection: shiftExistingPanel
            ? existingPanelInitialDockSection
            : getOtherSection(dockSection),
        });
      }
    }

    if (panelTabsVisible) {
      dock.panels.forEach((panel, uid) => {
        newPanels = updatePanel({
          newData: { dockSection: 'over', snappedDockUid: dockUid },
          panels: newPanels,
          panelUid: uid,
        });
      });
    }

    if (shouldSnapToDock) {
      if (dock.panels.size === 1) {
        // Full Dock the previous panel
        ({ newDocks, newPanels } = snapPanelToDock({
          docks: newDocks,
          dockUid,
          panels: newPanels,
          panelUid: dock.panels.keys().next().value,
        }));
      }

      ({ newDocks, newPanels } = snapPanelToDock({
        docks: newDocks,
        dockUid,
        panels: newPanels,
        panelUid,
      }));
    } else {
      ({ newDocks, newPanels } = addPanelToDock({
        docks: newDocks,
        dockUid,
        panels: newPanels,
        panelUid,
        panelTabsVisible,
      }));
    }

    newDocks = updateDock({
      newData: { arePanelTabsVisible: panelTabsVisible, hoverSection: null },
      dockUid,
      docks: newDocks,
    });
  }

  return {
    newDocks,
    newPanels,
  };
};

export default snapPanelToDockSection;
