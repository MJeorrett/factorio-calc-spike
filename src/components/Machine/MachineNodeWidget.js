import React, { useState } from 'react';
import { PortWidget } from '@projectstorm/react-diagrams';
import styled from '@emotion/styled';

import ItemIcon from '../ItemIcon';

import MachinePortWidget from './MachinePortWidget';

const S = {
  Root: styled.div`
    background: white;
    border: 1px solid dodgerblue;
    opacity: 0.95;
  `,
  Title: styled.div`
    border-bottom: 1px solid dodgerblue;
    display: flex;
    padding: 0.5rem;
  `,
  Label: styled.p`
    color: dodgerblue;
    flex-grow: 1;
    text-align: center;
  `,
  Content: styled.div`
    display: flex;
    padding: 0.5rem;
    width: 100%;
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
  }
  const inputs = [];
  const outputs = [];
  Object.keys(node.ports).forEach(portName => {
    const port = (
      <PortWidget
        key={portName}
        port={node.getPort(portName)}
        engine={engine}
      >
        <MachinePortWidget port={node.getPort(portName)} />
      </PortWidget>
    );
    if (portName.substr(0, portName.indexOf('-')) === 'ingredient') {
      inputs.push(port);
    }
    else {
      outputs.push(port);
    }
  });
  return (
    <S.Root>
      <S.Title>
        <ItemIcon itemName={node.options.itemName} />
        <S.Label>{node.options.label}</S.Label>
      </S.Title>
      <S.Content>
        <ItemIcon itemName={selectedItem} />
        <S.ItemSelect type="select" value={selectedItem} onChange={handleItemSelect}>
          <option value="" disabled>-- Please select an item --</option>
          {node.options.craftableItems.map(item => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </S.ItemSelect>
      </S.Content>
      <S.Ports>
        <S.InputPorts>
          {inputs}
        </S.InputPorts>
        <S.PortPadding />
        <S.OutputPorts>
          {outputs}
        </S.OutputPorts>
      </S.Ports>
    </S.Root>
  );
};

export default MachineNodeWidget;
