import React from 'react';
import styled from '@emotion/styled';
import { Tooltip } from '@material-ui/core';

import itemsConfig from '../../data/items-config.json';

import ItemIcon from '../ItemIcon';

const S = {
  Root: styled.p`
    background: ${p => p.satisfaction === 0 ? 'red' : 'white'};
    border: 1px solid white;
    border-color: ${p => p.isResource ? 'dodgerblue' : p.satisfaction < 1 ? 'red' : 'white'};
    border-radius: 3px;
    cursor: pointer;
    opacity: ${p => p.isResource ? 0.6 : 'inherit'};
    padding: 3px 3px 0 3px;
    :hover {
      opacity: 0.6;
    }
  `,
};

const MachinePortWidget = ({
  port,
}) => {
  const itemName = port.options.itemName;
  const itemConfig = itemsConfig.items[itemName];
  const isResource = Object.keys(itemsConfig.resource).includes(itemName);
  const satisfaction = !port.options.isInput || isResource ? 1 : port.satisfaction;

  return (
    <Tooltip title={`${itemConfig.localized_name.en} @ ${port.getProductionSpeed()} /s`}>
      <S.Root satisfaction={satisfaction} isResource={isResource}>
        <ItemIcon
          itemName={itemName}
          hideTooltip
          size={25}
        />
      </S.Root>
    </Tooltip>
  );
};

export default MachinePortWidget;
