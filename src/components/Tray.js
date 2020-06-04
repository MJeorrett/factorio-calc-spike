import React from 'react';
import styled from '@emotion/styled';

import producers from '../data/producers';

import TrayItem from './TrayItem';

const S = {
  Root: styled.div`
    background: white;
    border-right: 1px solid dodgerblue;
    border-bottom: 1px solid dodgerblue;
    height: 100vh;
    opacity: 0.9;
    overflow-y: scroll;
    padding: 0.5rem;
    position: absolute;
    left: 0;
    top: 0;
    & > *:not(:last-child) {
      margin-bottom: 0.75rem;
    }
  `,
};

const Tray = ({
  children,
}) => {
  return (
    <S.Root>
      {Object.keys(producers).map(producerKey => {
        const producer = producers[producerKey];
        return (
          <TrayItem
            key={producerKey}
            label={producer.label}
            producerName={producerKey}
            itemName={producer.defaultType}
          />
        );
      })}
    </S.Root >
  );
};

export default Tray;
