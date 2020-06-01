import React from 'react';
import styled from '@emotion/styled';

const S = {
  Root: styled.p`
    color: dodgerblue;
    padding: 0.5rem;
  `,
};

const ItemPortWidget = ({
  port,
}) => {
  return (
    <S.Root>
      {port.options.label}
    </S.Root>
  );
};

export default ItemPortWidget;
