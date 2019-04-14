import styled from 'styled-components';

const Button = styled.button`
  background: transparent;
  border: 0;
  border-right: 1px solid #3a89ea;
  cursor: pointer;
  padding: 0.2em;
  font-size: 0.8em;
  &.active {
    background: #3a89ea;
  }
`;

export { Button };
