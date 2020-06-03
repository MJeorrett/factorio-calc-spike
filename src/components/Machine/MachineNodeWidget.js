import React, { useState } from 'react';
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
    border-bottom: 1px solid dodgerblue;
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
  Content: styled.div`
    padding: 1rem;
    width: 100%;
  `,
  ItemSelect: styled.select`
    width: 100%;
  `,
  Ports: styled.div`
    border-top: 1px solid dodgerblue;
    display: flex;
    padding: 3px;
  `,
  InputPorts: styled.div`
    margin-right: 12px;
    &> *:not(:last-child) {
      margin-bottom: 3px;
    }
  `,
  PortPadding: styled.div`
    flex-grow: 1;
  `,
  OutputPorts: styled.div`
    align-self: right;
    &> *:not(:last-child) {
      margin-bottom: 3px;
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
        <S.Icon
          src="img/pixel.gif"
          iconCol={node.options.iconCol}
          iconRow={node.options.iconRow}
        />
        <S.Label>{node.options.label}</S.Label>
      </S.Title>
      <S.Content>
        <S.ItemSelect type="select" value={selectedItem} onChange={handleItemSelect}>
          <option value="" disabled>-- Please select an item --</option>
          {node.options.craftableItems.map(item => (
            <option key={item} value={item}>{item}</option>
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
