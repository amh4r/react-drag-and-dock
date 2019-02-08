import styled from 'styled-components';

const Handle = styled.div`
  background: #d3e4f9;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

const Root = styled.div`
  background: white;
  border: 1px solid #3a89ea;
  box-sizing: border-box;
  position: absolute;
`;

export { Handle, Root };
