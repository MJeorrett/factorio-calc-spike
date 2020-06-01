import React from 'react';
import styled from '@emotion/styled';

import diagramEngine from './diagramEngine';

import Canvas from './components/Canvas';

const S = {
  Title: styled.h1`
    left: 0;
    position: absolute;
    text-align: center;
    top: 0;
    width: 100%;
  `,
}

function App() {
  return (
    <>
      <S.Title>Factorio Calc</S.Title>
      <Canvas engine={diagramEngine} />
    </>
  );
}

export default App;
