import validate from './validate';

const validateArguments = ({ docks, dockUid }) => {
  validate.docks(docks);
  validate.dockUid(dockUid);
};

const unregisterDock = ({ docks, dockUid }) => {
  validateArguments({ docks, dockUid });

  if (!docks.has(dockUid)) {
    throw new Error(`No dock registered with uid "${dockUid}"`);
  }

  const newDocks = new Map(docks);

  newDocks.delete(dockUid);

  return {
    newDocks,
  };
};

export default unregisterDock;
