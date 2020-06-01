import React from 'react';
import styled from '@emotion/styled';
import { CanvasWidget } from '@projectstorm/react-canvas-core';

const S = {
  Root: styled(CanvasWidget)`
    height: 100%;
    width: 100vw;
  `,
};

const Canvas = ({
  engine
}) => {
  return (
    <S.Root engine={engine} />
  );
};

export default Canvas;
