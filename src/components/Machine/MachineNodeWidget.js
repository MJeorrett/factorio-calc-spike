import React from 'react';
import { PortWidget } from '@projectstorm/react-diagrams';
import styled from '@emotion/styled';

import MachinePortWidget from './MachinePortWidget';

const S = {
  Root: styled.div`
    background: white;
    border: 1px solid dodgerblue;
    opacity: 0.95;
  `,
  Title: styled.div`
    display: flex;
    padding: 1rem;
  `,
  Label: styled.p`
    color: dodgerblue;
  `,
  Icon: styled.img`
    background: url("img/sprite-sheet.png") ${p => `${p.iconCol * -32}px ${p.iconRow * -32}px`};
    height: 32px;
    margin-right: 1rem;
    min-width: 32px;
    max-width: 32px;
  `,
  Ports: styled.div`
    border-top: 1px solid dodgerblue;
    padding: 3px;
    &> *:not(:last-child) {
      margin-bottom: 3px;
    }
  `,
};

const MachineNodeWidget = ({
  engine,
  node
}) => {
  return (
    <S.Root>
      <S.Title>
        <S.Icon
          src="img/pixel.gif"
          iconCol={node.options.iconCol}
          iconRow={node.options.iconRow}
        />
        <S.Label>{node.options.label}</S.Label>
      </S.Title>
      <S.Ports>
        {Object.keys(node.ports).map(portName => (
          <PortWidget
            port={node.getPort(portName)}
            engine={engine}
          >
            <MachinePortWidget port={node.getPort(portName)} />
          </PortWidget>
        ))}
      </S.Ports>
    </S.Root>
  );
};

export default MachineNodeWidget;
