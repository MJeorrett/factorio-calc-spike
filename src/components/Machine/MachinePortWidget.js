import React from 'react';
import styled from '@emotion/styled';
import { Tooltip } from '@material-ui/core';

const S = {
  Root: styled.p`
    background: dodgerblue;
    color: white;
    padding: 0.5rem;
    :hover {
      opacity: 0.85;
    }
  `,
};

const MachinePortWidget = ({
  port,
}) => {
  return (
    <Tooltip title={`${port.options.productionSpeed} /s`}>
      <S.Root>
        {port.options.label}
      </S.Root>
    </Tooltip>
  );
};

export default MachinePortWidget;
