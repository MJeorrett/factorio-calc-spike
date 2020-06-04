import React from 'react';
import styled from '@emotion/styled';

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
  name,
  itemName,
  children
}) => {
  const handleDragStart = event => {
    event.dataTransfer.setData('node-type', itemName);
  };

  return (
    <S.TrayItem
      draggable={true}
      onDragStart={handleDragStart}
    >
      <ItemIcon itemName={itemName} />
    </S.TrayItem>
  );
};

export default TrayItem;
