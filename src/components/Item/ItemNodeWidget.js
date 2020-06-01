import React from 'react';
import { PortWidget } from '@projectstorm/react-diagrams';
import styled from '@emotion/styled';

import ItemPortWidget from './ItemPortWidget';

const S = {
  Root: styled.div`
    background: white;
    border: 1px solid dodgerblue;
    opacity: 0.95;
  `,
  Label: styled.p`
    color: dodgerblue;
    padding: 1rem;
  `,
  Ports: styled.div`
    border-top: 1px solid dodgerblue;
  `,
};

const ItemNodeWidget = ({
  engine,
  node
}) => {
  return (
    <S.Root>
      <S.Label>{node.options.label}</S.Label>
      <S.Ports>
        <PortWidget
          port={node.getPort('coal')}
          engine={engine}
        >
          <ItemPortWidget port={node.getPort('coal')} />
        </PortWidget>
      </S.Ports>
    </S.Root>
  );
};

export default ItemNodeWidget;
