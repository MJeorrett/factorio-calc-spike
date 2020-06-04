import React from 'react';
import { PortWidget } from '@projectstorm/react-diagrams';
import styled from '@emotion/styled';

import ItemIcon from '../ItemIcon';

import MachinePortWidget from './MachinePortWidget';

const S = {
  Root: styled.div`
    background: white;
    border: ${p => p.isSelected ? '2px solid dodgerblue' : '1px solid dodgerblue'};
    border-radius: 2px;
    opacity: 0.95;
    transition: all 200ms ease-out;
  `,
  Title: styled.div`
    border-bottom: 1px solid dodgerblue;
    display: flex;
    padding: 0.25rem 0.5rem;
    text-align: center;
    & > *:not(:last-child) {
      margin-right: 0.5rem;
    }
  `,
  Content: styled.div`
    padding: 0.25rem 0.5rem;
    width: 100%;
  `,
  ItemSelectContainer: styled.div`
    display: flex;
    & > *:not(:last-child) {
      margin-right: 0.5rem;
    }
  `,
  ItemSelect: styled.select`
    flex-grow: 1;
    width: 5rem;
  `,
  Ports: styled.div`
    border-top: 1px solid dodgerblue;
    display: flex;
    padding: 0.25rem;
  `,
  InputPorts: styled.div`
    margin-right: 0.5rem;
  `,
  PortPadding: styled.div`
    flex-grow: 1;
  `,
  OutputPorts: styled.div`
    align-self: right;
  `,
};

const MachineNodeWidget = ({
  engine,
  node
}) => {
  const handleItemSelect = event => {
    node.setProductionItem(event.target.value);
    engine.repaintCanvas();
  }
  const inputs = [];
  const outputs = [];
  Object.keys(node.ports).forEach(portName => {
    const port = node.getPort(portName);
    const portWidget = (
      <PortWidget
        key={portName}
        port={port}
        engine={engine}
      >
        <MachinePortWidget port={port} />
      </PortWidget>
    );
    if (port.options.isInput) {
      inputs.push(portWidget);
    }
    else {
      outputs.push(portWidget);
    }
  });
  const hasPorts = inputs.length > 0 || outputs.length > 0;
  return (
    <S.Root isSelected={node.isSelected()}>
      <S.Title>
        <ItemIcon itemName={node.options.itemName} size={32} />
      </S.Title>
      <S.Content>
        <S.ItemSelectContainer>
          <S.ItemSelect type="select" value="" onChange={handleItemSelect}>
            <option value="" disabled>-- Select --</option>
            {node.options.craftableItems.map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </S.ItemSelect>
        </S.ItemSelectContainer>
      </S.Content>
      {hasPorts && <S.Ports>
        <S.InputPorts>
          {inputs}
        </S.InputPorts>
        <S.PortPadding />
        <S.OutputPorts>
          {outputs}
        </S.OutputPorts>
      </S.Ports>}
    </S.Root>
  );
};

export default MachineNodeWidget;
