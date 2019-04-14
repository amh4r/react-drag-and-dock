import React from 'react';
import { Handle, Root } from './styles';

const RootContainer = ({ children, isDocked, style }) => {
  return (
    <Root isDocked={isDocked} style={style}>
      {children}
    </Root>
  );
};

const TitleBar = ({ draggableClassName, style, title }) => {
  return (
    <Handle className={draggableClassName} style={style}>
      {title}
    </Handle>
  );
};

const PanelArea = ({ children, style }) => {
  return <div style={style}>{children}</div>;
};

export const components = {
  PanelArea,
  RootContainer,
  TitleBar,
};

export const defaultComponents = (props) => ({
  ...components,
  ...props.components,
});
