import React from 'react';
import { StyledNext } from './styles/StyledNext';

import NextCell from './NextCell';

const Stage = ({ stage }) => (
  <StyledNext width={stage[0].length} height={stage.length}>
    {stage.map(row => row.map((cell, x) => <NextCell key={x} type={cell[0]} />))}
  </StyledNext>
  );

export default Stage;
