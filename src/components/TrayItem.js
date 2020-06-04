import React from 'react';
import styled from '@emotion/styled';
import { Tooltip } from '@material-ui/core';

import ItemIcon from './ItemIcon';

const S = {
  TrayItem: styled.div`
    border: 1px solid dodgerblue;
    cursor: pointer;
    padding: 0.5rem;
    flex-shrink: 1;
  `,
};

const TrayItem = ({
  id,
  label,
  itemName,
  producerName,
  children
}) => {
  const handleDragStart = event => {
    event.dataTransfer.setData('node-type', producerName);
  };

  return (
    <Tooltip title={label}>
      <S.TrayItem
        draggable={true}
        onDragStart={handleDragStart}
      >
        <ItemIcon hideTooltip itemName={itemName} />
      </S.TrayItem>
    </Tooltip>
  );
};

export default TrayItem;
