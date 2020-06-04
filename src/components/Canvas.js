import React from 'react';
import styled from '@emotion/styled';
import { CanvasWidget } from '@projectstorm/react-canvas-core';

import * as Machine from './Machine';

const S = {
  Root: styled.div`
    height: 100vh;
  `,
  Canvas: styled(CanvasWidget)`
    height: 100%;
  `,
};

const Canvas = ({
  engine
}) => {
  const handleDrop = event => {
    const itemName = event.dataTransfer.getData('node-type');

    const node = new Machine.Model(itemName);
    let mousePosition = engine.getRelativeMousePoint(event);
    node.setPosition(mousePosition);

    engine.getModel().addNode(node);
    engine.repaintCanvas();
  };
  

  return (
    <S.Root
      onDrop={handleDrop}
      onDragOver={event => event.preventDefault()}
    >
      <S.Canvas engine={engine} />
    </S.Root>
  );
};

export default Canvas;
