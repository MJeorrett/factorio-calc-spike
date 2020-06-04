import React, { useState } from 'react';
import { PortWidget } from '@projectstorm/react-diagrams';
import styled from '@emotion/styled';

import ItemIcon from '../ItemIcon';

import MachinePortWidget from './MachinePortWidget';

const S = {
  Root: styled.div`
    background: white;
    border: ${p => p.isSelected ? '2.5px solid dodgerblue' : '1px solid dodgerblue'};
    opacity: 0.95;
    transition: all 200ms ease-out;
  `,
  Title: styled.div`
    border-bottom: 1px solid dodgerblue;
    display: flex;
    padding: 0.25rem 0.5rem;
  `,
  Label: styled.h4`
    color: dodgerblue;
    flex-grow: 1;
    text-align: center;
    vertical-align: middle;
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
  `,
  Ports: styled.div`
    border-top: 1px solid dodgerblue;
    display: flex;
    padding: 0.25rem;
  `,
  InputPorts: styled.div`
    margin-right: 1rem;
    &> *:not(:last-child) {
      margin-bottom: 0.25rem;
    }
  `,
  PortPadding: styled.div`
    flex-grow: 1;
  `,
  OutputPorts: styled.div`
    align-self: right;
    &> *:not(:last-child) {
      margin-bottom: 0.25rem;
    }
  `,
};

const MachineNodeWidget = ({
  engine,
  node
}) => {
  const [selectedItem, setSelectedItem] = useState('');
  const handleItemSelect = event => {
    node.setProductionItem(event.target.value);
    setSelectedItem(event.target.value);
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
        <ItemIcon itemName={node.options.itemName} />
        <S.Label>{node.options.label}</S.Label>
      </S.Title>
      <S.Content>
        <S.ItemSelectContainer>
          <ItemIcon itemName={selectedItem} />
          <S.ItemSelect type="select" value={selectedItem} onChange={handleItemSelect}>
            <option value="" disabled>-- Please select an item --</option>
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
