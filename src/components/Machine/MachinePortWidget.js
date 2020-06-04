import React from 'react';
import styled from '@emotion/styled';
import { Tooltip } from '@material-ui/core';

import itemsConfig from '../../data/items-config.json';

import ItemIcon from '../ItemIcon';

const S = {
  Root: styled.p`
    background: white;
    border: 1px solid white;
    border-radius: 3px;
    color: white;
    padding: 3px 3px 0 3px;
    :hover {
      border-color: dodgerblue;
    }
  `,
};

const MachinePortWidget = ({
  port,
}) => {
  const itemName = port.options.itemName;
  const itemConfig = itemsConfig.items[itemName];
  return (
    <Tooltip title={`${itemConfig.localized_name.en} @ ${port.options.productionSpeed} /s`}>
      <S.Root>
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
