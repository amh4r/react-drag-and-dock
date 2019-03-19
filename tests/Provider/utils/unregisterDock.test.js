import {
  registerDock,
  unregisterDock,
} from '../../../src/Provider/utils';

describe('Unregister dock', () => {
  let docks;

  beforeEach(() => {
    docks = new Map();
    docks = registerDock({ data: {}, docks, dockUid: 'dock-1' });
  });

  it('removes the dock from docks', () => {
    ({ newDocks: docks } = unregisterDock({ docks, dockUid: 'dock-1' }));
    expect(docks.size).toEqual(0);
  });


  it(`throws error when the dockUid isn't already registered`, () => {
    expect(() => {
      unregisterDock('dock-foo');
    }).toThrow(TypeError);
  });
});
