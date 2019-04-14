import updateDock from './updateDock';
import { getOtherSection } from './dockSections';
import shiftPanelOnDock from './shiftPanelOnDock';
import removePanelFromDocks from './removePanelFromDocks';
import changeDockActivePanel from './changeDockActivePanel';
import snapPanelToDockSection from './snapPanelToDockSection';

const previewPanelOnDock = ({ docks, dockUid, hoverSectionOnDock, panels, panelUid }) => {
  let newDocks = new Map(docks);
  let newPanels = new Map(panels);

  ({ newDocks, newPanels } = removePanelFromDocks({
    docks: newDocks,
    panels: newPanels,
    panelUid,
  }));

  if (!dockUid) {
    newDocks.forEach((dock, uid) => {
      if (!dock.previewed) return;

      newDocks = updateDock({
        newData: { hoverSection: null, previewed: false },
        docks: newDocks,
        dockUid: uid,
      });

      dock.panels.forEach((panel, dockPanelUid) => {
        if (dockPanelUid === panelUid) return;

        ({ newDocks, newPanels } = snapPanelToDockSection({
          panelUid: dockPanelUid,
          dockUid: uid,
          docks: newDocks,
          panels: newPanels,
          dockSection: panel.dockSection,
        }));
      });
    });

    return { newDocks, newPanels };
  }

  const dock = newDocks.get(dockUid);

  const panelTabsVisible = dock.panels.size > 1 || (dock.panels.size === 1 && hoverSectionOnDock === 'over');
  const shouldSplitDock = !panelTabsVisible && hoverSectionOnDock !== 'over' && dock.props.split;

  if (shouldSplitDock) {
    const existingPanelUid = dock.panels.keys().next().value;
    newPanels = shiftPanelOnDock({
      dock,
      panelTabsVisible,
      dockSection: getOtherSection(hoverSectionOnDock),
      panelUid: existingPanelUid,
      panels: newPanels,
      preview: true,
    });
  }

  newDocks = updateDock({
    docks: newDocks,
    dockUid,
    newData: {
      arePanelTabsVisible: panelTabsVisible,
      hoverSection: hoverSectionOnDock,
      previewed: true,
    },
  });

  if (panelTabsVisible) {
    ({ newDocks, newPanels } = changeDockActivePanel({
      panels: newPanels,
      docks: newDocks,
      dockUid,
      activePanelUid: dock.panels.keys().next().value,
    }));
  }

  return { newDocks, newPanels };
};

export default previewPanelOnDock;
