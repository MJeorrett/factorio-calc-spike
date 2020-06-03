import React from 'react';
import styled from '@emotion/styled';

const S = {
  Root: styled.p`
    background: dodgerblue;
    color: white;
    padding: 0.5rem;
  `,
};

const MachinePortWidget = ({
  port,
}) => {
  return (
    <S.Root>
      {port.options.label}
    </S.Root>
  );
};

export default MachinePortWidget;
