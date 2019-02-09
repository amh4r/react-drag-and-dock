const updateDock = ({ newData, uid, docks }) => {
  const oldData = docks.get(uid);

  if (!uid) throw new Error();
  const newDock = {
    ...oldData,
    ...newData,
    uid,
  };

  const newDocks = new Map(docks).set(uid, newDock);

  return newDocks;
};

export default updateDock;
