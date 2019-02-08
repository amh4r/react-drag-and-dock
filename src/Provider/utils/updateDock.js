const updateDock = ({ newData, ref, docks }) => {
  const oldData = docks.get(ref);

  const newDock = {
    ...oldData,
    ...newData,
    ref,
  };

  const newDocks = new Map(docks).set(ref, newDock);

  return newDocks;
};

export default updateDock;
