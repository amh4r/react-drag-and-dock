const updateDock = ({ newData, docks, dockUid }) => {
  const oldData = docks.get(dockUid);

  if (!dockUid) throw new Error();
  const newDock = {
    ...oldData,
    ...newData,
    uid: dockUid,
  };

  const newDocks = new Map(docks).set(dockUid, newDock);

  return newDocks;
};

export default updateDock;
