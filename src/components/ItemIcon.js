import React from 'react';
import styled from '@emotion/styled';

import itemsConfig from '../data/items-config.json';

const S = {
  Root: styled.img`
    background: url("img/sprite-sheet.png") ${p => `${p.iconCol * -32}px ${p.iconRow * -32}px`};
    height: 32px;
    margin-right: 1rem;
    min-width: 32px;
    max-width: 32px;
  `,
  Placeholder: styled.span`
    border: 1px solid grey;
    height: 32px;
    margin-right: 1rem;
    padding: 3px;
    text-align: center;
    width: 32px;
  `,
};

const ItemIcon = ({
  itemName,
}) => {
  if (!itemName) {
    return (
      <S.Placeholder>
        ?
      </S.Placeholder>
    );
  }

  const itemConfig = itemsConfig[itemName];
  return (
    <S.Root
      src="img/pixel.gif"
      iconCol={itemConfig.icon_col}
      iconRow={itemConfig.icon_row}
    />
  );
};

export default ItemIcon;
