import styled from 'styled-components';

const DockContainer = styled.div`
  display: flex;
  flex-direction: column;
  touch-action: none;
  height: 100%;
  ${({ width }) =>
    width &&
    ` min-width: ${width}px;
      width: ${width}px;
    `}
  position: ${({ hasPanels, isOver }) => (hasPanels || isOver ? null : 'absolute')};
  left: ${({ hasPanels, location }) => (!hasPanels && location === 'left' ? 0 : null)};
  right: ${({ hasPanels, location }) => (!hasPanels && location === 'right' ? 0 : null)};
  border-width: ${({ isOver }) => (isOver ? '1px' : '0px')};
  border-style: dotted;
`;

const DockSection = styled.div`
  flex-basis: 50%;
  border-width: ${({ isOver }) => (isOver ? '1px' : '0px')};
  border-style: dotted;
`;

export { DockContainer, DockSection };
