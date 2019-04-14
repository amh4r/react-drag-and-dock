const sections = ['bottom', 'over', 'top'];

const getOtherSection = (section) => {
  if (section === 'top') {
    return 'bottom';
  }
  if (section === 'bottom') {
    return 'top';
  }
  if (section === 'over') {
    return 'over';
  }
  return null;
};

const validateSection = (section) => {
  if (sections.indexOf(section) === -1) {
    // throw new TypeError(`Invalid Section. Value should be from 'bottom', 'over' or 'top'`);
    return false;
  }
  return true;
};

export { getOtherSection, validateSection };
