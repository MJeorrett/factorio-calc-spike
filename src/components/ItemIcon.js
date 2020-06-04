import React from 'react';
import styled from '@emotion/styled';
import { Tooltip } from '@material-ui/core';

import itemsConfig from '../data/items-config.json';

const horizontalTileCount = 15;
const verticalTileCount = 16;
const tileSize = 32;

const S = {
  Root: styled.img`
    background: url("img/sprite-sheet.png") ${p => `${p.iconX}px ${p.iconY}px`};
    background-size: ${p => `${p.imageWidth}px ${p.imageHeight}px`};
    height: ${p => p.size}px;
    margin: auto;
    width: ${p => p.size}px;
  `,
  Placeholder: styled.span`
    border: 1px solid grey;
    height: ${p => p.size}px;
    margin: auto;
    padding: 3px;
    text-align: center;
    width: ${p => p.size}px;
  `,
};

const ItemIcon = ({
  itemName,
  hideTooltip,
  size = 32,
}) => {
  if (!itemName) {
    return (
      <S.Placeholder>
        ?
      </S.Placeholder>
    );
  }

  const itemConfig = itemsConfig.recipes[itemName];

  const scale = size / tileSize;
  const imageHeight = (verticalTileCount * tileSize) * scale;
  const imageWidth = (horizontalTileCount * tileSize) * scale;
  const iconX = itemConfig.icon_col * (-32 * scale);
  const iconY = itemConfig.icon_row * (-32 * (size / 32));

  return (
    <Tooltip title={hideTooltip ? '' : itemConfig.localized_name.en}>
      <S.Root
        src="img/pixel.gif"
        size={size}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        iconX={iconX}
        iconY={iconY}
      />
    </Tooltip>
  );
};

export default ItemIcon;
